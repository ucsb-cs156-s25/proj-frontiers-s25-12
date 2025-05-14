package edu.ucsb.cs156.frontiers.repositories;

import java.util.Optional;

import edu.ucsb.cs156.frontiers.entities.Course;
import edu.ucsb.cs156.frontiers.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import edu.ucsb.cs156.frontiers.entities.RosterStudent;

import java.util.List;

public interface RosterStudentRepository extends JpaRepository<RosterStudent, Long>
{
    List<RosterStudent> findAllByEmail(String email);
    public Iterable<RosterStudent> findByCourseId(Long courseId);
    public Optional<RosterStudent> findByCourseIdAndStudentId(Long courseId, String studentId);

    Optional<RosterStudent> findByCourseAndGithubId(Course course, int githubId);

    Optional<RosterStudent> findByCourseAndGithubLogin(Course course, String githubLogin);

    Iterable<RosterStudent> findAllByUser(User user);
}
