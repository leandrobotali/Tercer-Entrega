import { createAdminUser } from "./helpers/createUser.js";
import logger from './helpers/logger.js'
import cluster from 'cluster'
import os from 'os'

import { conectar} from './server.js'

let PORT = process.env.PORT ?? 8080

let MODE = process.argv[3] || "fork"

if (MODE == "cluster"){
    if (cluster.isPrimary) {
        const cantCpus = os.cpus().length
        for (let i = 0; i < cantCpus; i++) {
            cluster.fork()
        }
        cluster.on('exit', worker => {
            logger.info(`se cerro el proceso: '${worker.process.pid}'`)
            cluster.fork()
        })
    } else {
        await conectar({ port: PORT })
        await createAdminUser();
    }
}else {
    await conectar({ port: PORT })
    await createAdminUser();
}
