package ru.urfu.raspisline.service;

import org.springframework.stereotype.Service;
import ru.urfu.raspisline.dao.ScheduleDao;
import ru.urfu.raspisline.model.possibility.PossibilityItem;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.nCopies;
import static ru.urfu.raspisline.model.possibility.Possibility.*;

@Service
public class SchedulePossibilityService {

    private final ScheduleDao scheduleDao;

    public SchedulePossibilityService(ScheduleDao scheduleDao) {
        this.scheduleDao = scheduleDao;
    }

    public List<List<PossibilityItem>> getSchedulePossibilityForWeek(
            String group,
            String teacherId,
            String auditorium,
            String firstWeekDay
    ) {
        var result = new ArrayList<List<PossibilityItem>>();
        var currentDay = LocalDate.parse(firstWeekDay);
        for (int i = 0; i < 7; i++) {
            var busyPairByGroup = scheduleDao.getBusyPairsForStudent(currentDay, group);
            var busyPairByTeacher = scheduleDao.getBusyPairsForTeacher(currentDay, teacherId);
            var busyPairByAuditorium = scheduleDao.getBusyPairsForAuditorium(currentDay, auditorium);

            var possibilityForGroup = processPossibilityItem(busyPairByGroup, "group");
            var possibilityForTeacher = processPossibilityItem(busyPairByTeacher, "teacher");
            var possibilityForAuditorium = processPossibilityItemForAuditory(busyPairByAuditorium);
            result.add(i, mergePossibilities(possibilityForGroup, possibilityForTeacher, possibilityForAuditorium));
            currentDay = currentDay.plusDays(1);
        }

        return result;

    }

    private List<PossibilityItem> processPossibilityItem(List<Integer> busyPairs, String resourceType) {
        if (busyPairs.isEmpty()) {
            return new ArrayList<>(nCopies(8, new PossibilityItem(GREEN, "")));
        }

        // Если больше уже больше 4-х пар, у данного ресурса, но назначение большего количества пар - желтый статус для всего дня
        if (busyPairs.size() > 4) {
            var result = new ArrayList<>(nCopies(8, new PossibilityItem(YELLOW, "Too much lessons at this day for given " + resourceType)));
            busyPairs.forEach(pair -> result.set(pair - 1, new PossibilityItem(RED, "The given " + resourceType + " is busy at this time")));
            return result;
        }

        var result = new ArrayList<>(nCopies(8, new PossibilityItem(YELLOW, "Unwanted schedule gap exists for given " + resourceType)));
        // Проставляем "зеленый" стастус всем парам, соседним от занятых пар
        busyPairs.forEach(pair -> {
            if (pair - 2 >= 0) {
                result.set(pair - 2, new PossibilityItem(GREEN, ""));
            }
            if (pair < 8) {
                result.set(pair, new PossibilityItem(GREEN, ""));
            }
        });

        busyPairs.forEach(pair -> result.set(pair - 1, new PossibilityItem(RED, "The given " + resourceType + " is busy at this time")));

        return result;
    }

    private List<PossibilityItem> processPossibilityItemForAuditory(List<Integer> busyPairs) {
        var result = new ArrayList<>(nCopies(8, new PossibilityItem(GREEN, "")));
        busyPairs.forEach(pair -> result.set(pair - 1, new PossibilityItem(RED, "The given auditory is busy at this time")));
        return result;
    }

    private List<PossibilityItem> mergePossibilities(
            List<PossibilityItem> groupPossibilities,
            List<PossibilityItem> teacherPossibilities,
            List<PossibilityItem> auditoriumPossibilities
    ) {
        var result = new ArrayList<PossibilityItem>();
        for (int i = 0; i < 8; i++) {
            if (groupPossibilities.get(i).getPossibility().equals(RED)) {
                result.add(i, groupPossibilities.get(i));
                continue;
            }
            if (teacherPossibilities.get(i).getPossibility().equals(RED)) {
                result.add(i, teacherPossibilities.get(i));
                continue;
            }
            if (auditoriumPossibilities.get(i).getPossibility().equals(RED)) {
                result.add(i, auditoriumPossibilities.get(i));
                continue;
            }

            if (groupPossibilities.get(i).getPossibility().equals(YELLOW)) {
                result.add(i, groupPossibilities.get(i));
                continue;
            }
            if (teacherPossibilities.get(i).getPossibility().equals(YELLOW)) {
                result.add(i, teacherPossibilities.get(i));
                continue;
            }
            if (auditoriumPossibilities.get(i).getPossibility().equals(YELLOW)) {
                result.add(i, auditoriumPossibilities.get(i));
                continue;
            }
            result.add(new PossibilityItem(GREEN, ""));
        }

        return result;
    }

}
