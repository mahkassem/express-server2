import StudentsEntity, { Student } from "../entities/students.entity"

class StudentService {
    async create(student: Student): Promise<Student> {
        const _studentsEntity = new StudentsEntity()
        const createdStudent = await _studentsEntity.create(student)
        return createdStudent
    }

    async getById(id: number): Promise<Student> {
        const _studentsEntity = new StudentsEntity()
        const student = await _studentsEntity.getById(id)
        return student
    }

    async getByIdWithUser(id: number): Promise<Student> {
        const _studentsEntity = new StudentsEntity()
        const student = await _studentsEntity.getByIdWithUser(id)
        return student
    }
}

export default StudentService