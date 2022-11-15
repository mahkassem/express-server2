import { Request, Response } from "express"
import AuthService from "../services/auth.service"
import StudentService from "../services/student.service"
import { User } from "../entities/users.entity"
import { Student } from "../entities/students.entity"

const _authService = new AuthService()
const _studentService = new StudentService()

const getListHandler = async (req: Request, res: Response) => {
    const { page, perPage } = req.query as { page: string, perPage: string }
    const students = await _studentService.getList({ page: parseInt(page), perPage: parseInt(perPage) })
    res.json(students)
}

const createHandler = async (req: Request, res: Response) => {
    try {
        // get user and student from request body
        const { user, student } = req.body as { user: User, student: Student }
        // use user service to create user
        const createdUser = await _authService.register(user)
        student.user_id = createdUser.id as number
        // use student service to create student
        const createdStudent = await _studentService.create(student)
        createdStudent.user = createdUser
        // return user
        res.status(201).send(createdStudent)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

const getByIdHandler = async (req: Request, res: Response) => {
    try {
        // get id from request params
        const { id } = req.params as { id: string }
        // use student service to get student by id
        const student = await _studentService.getByIdWithUser(parseInt(id))
        // return student
        res.status(200).send(student)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export { createHandler, getByIdHandler, getListHandler }