import { logger } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'
import { boardService } from './board.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

export async function getBoards(req, res) {
    try {
        const boards = await boardService.query()
        res.json(boards);
    } catch (err) {
        logger.error('Failed to get boards', err);
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

export async function getBoardById(req, res) {
    try {
        const boardId = req.params.id;
        const board = await boardService.getBoardById(boardId)
        res.json(board);
    } catch (err) {
        logger.error('Failed to get board', err);
        res.status(500).send({ err: 'Failed to get board' })
    }
}
export async function addBoard(req, res) {


    try {
        const board = req.body;
        const addedBoard = await boardService.add(board)
        res.json(addedBoard);


        // socketService.broadcast({ type: 'review-added', data: review, userId: loggedinUser._id })
        // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        // delete review.aboutUserId
        // delete review.byUserId


    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

export async function updateBoard(req, res) {
     
    try {
        const board = req.body;
        // console.log('board in updateBoard', board)
        const updatedBoard = await boardService.update(board)
        res.json(updatedBoard);

        socketService.broadcast({ type: 'board-updated', data: board })

    } catch (err) {
        logger.error('Failed to update board', err);
        res.status(500).send({ err: 'Failed to update board' })
    }
}

export async function removeBoard(req, res) {
    try {
        const boardId = req.params.id
        await boardService.remove(boardId)
        res.send()
    } catch (err) {
        logger.error('Failed to remove board', err)
        res.status(500).send({ err: 'Failed to remove board' })
    }
}

// export async function addBoardMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const boardId = req.params.id
//         const msg = {
//             txt: req.body.txt,
//             by: loggedinUser,
//         }
//         const savedMsg = await boardService.addBoardMsg(boardId, msg)
//         res.json(savedMsg)
//     } catch (err) {
//         logger.error('Failed to update board', err)
//         res.status(500).send({ err: 'Failed to update board' })
//     }
// }

// export async function removeBoardMsg(req, res) {
//     // const { loggedinUser } = req
//     try {
//         const boardId = req.params.id
//         const { msgId } = req.params

//         const removedId = await boardService.removeBoardMsg(boardId, msgId)
//         res.send(removedId)
//     } catch (err) {
//         logger.error('Failed to remove board msg', err)
//         res.status(500).send({ err: 'Failed to remove board msg' })
//     }
// }