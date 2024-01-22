import { userService } from './user.service.js'
import { logger } from '../../services/logger.service.js'

export async function getUser(req, res) {
    try {
        const userId = req.params.id
        const user = await userService.getUserById(userId);
        res.send(user);
    } catch (err) {
        logger.error('Failed to get user', err);
        res.status(500).send({ err: 'Failed to get user' });
    }
}

export async function getUsers(req, res) {
    try {
        const users = await userService.query();
        res.send(users);
    } catch (err) {
        logger.error('Failed to get users', err);
        res.status(500).send({ err: 'Failed to get users' });
    }
}

export async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

export async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}