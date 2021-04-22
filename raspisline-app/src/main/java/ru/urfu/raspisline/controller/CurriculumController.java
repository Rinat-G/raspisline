package ru.urfu.raspisline.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.urfu.raspisline.dao.CurriculumDao;
import ru.urfu.raspisline.model.CurriculumItem;
import ru.urfu.raspisline.model.schedule.CurriculumItemForSchedule;

import java.util.List;

@RestController
@RequestMapping(value = "/api/curriculum")
public class CurriculumController {

    private final CurriculumDao curriculumDao;

    public CurriculumController(final CurriculumDao curriculumDao) {
        this.curriculumDao = curriculumDao;
    }

    @PostMapping(value = "/add")
    public ResponseEntity<String> addNewCurriculumItem(@RequestBody final CurriculumItem item) {
        try {
            curriculumDao.insertNewCurriculumItem(item);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
        return ResponseEntity.ok("success");
    }

    @GetMapping
    public List<CurriculumItem> getCurriculum() {
        return curriculumDao.getAllCurriculumItemsWithTeacherName();
    }

    @GetMapping(value = "/group/{name}")
    public List<CurriculumItemForSchedule> getCurriculumForGroup(@PathVariable String name) {
        return curriculumDao.getAllCurriculumItemsForGroup(name);
    }

    @GetMapping(value = "/teacher/{id}")
    public List<CurriculumItemForSchedule> getCurriculumForTeacher(@PathVariable Long id) {
        return curriculumDao.getAllCurriculumItemsForTeacher(id);
    }
}
