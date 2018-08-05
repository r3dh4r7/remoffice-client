import ioClient from 'socket.io-client'
import appConfig from '../config'

const io = appConfig.localMode ? ioClient(window.location.hostname + ':' + appConfig.server.port) : ioClient(appConfig.server.host + ':' + appConfig.server.port)

export default io
