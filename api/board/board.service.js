import mongodb from 'mongodb'
const { ObjectId } = mongodb

// import { utilService } from '../../services/util.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const boardService = {
    remove,
    query,
    getBoardById,
    add,
    update,
    // addBoardMsg,
    // removeBoardMsg
}

async function query() {
    try {
        const collection = await dbService.getCollection('boardamir');
        const boards = await collection.find({}).toArray();
        return boards;
    } catch (err) {
        logger.error('cannot find boards', err);
        throw err;
    }
}

async function getBoardById(boardId) {
    try {
        const collection = await dbService.getCollection('boardamir');
        const board = collection.findOne({ _id: new ObjectId(boardId) });
        return board;
    } catch (err) {
        logger.error(`while finding board: ${boardId}`, err);
        throw err;
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('boardamir')
        await collection.deleteOne({ _id: new ObjectId(boardId) })
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('boardamir')
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = { ...board }
        delete boardToSave._id


        const collection = await dbService.getCollection('boardamir')
        await collection.updateOne({ _id: new ObjectId(board._id) }, { $set: boardToSave })
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

// async function addBoardMsg(boardId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('boardamir')
//         await collection.updateOne({ _id: new ObjectId(boardId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add board msg ${boardId}`, err)
//         throw err
//     }
// }

// async function removeBoardMsg(boardId, msgId) {
//     try {
//         const collection = await dbService.getCollection('boardamir')
//         await collection.updateOne({ _id: new ObjectId(boardId) }, { $pull: { msgs: { id: msgId } } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add board msg ${boardId}`, err)
//         throw err
//     }
// }