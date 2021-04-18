package ru.urfu.raspisline.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.urfu.raspisline.jpa.entity.CurriculumItem;

@Repository
public interface CurriculumRepository extends JpaRepository<CurriculumItem, Long> {

}
