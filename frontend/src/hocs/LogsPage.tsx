import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { AuditLog, Island, LogLevel } from '@/lib/types'
import { generatePDF } from '@/lib/logs'
import axios from 'axios'
import MapIcon from '@/components/assets/mapIcon.webp'

const logTypeInfo = {
  MEASUREMENT: { label: 'medida', color: 'bg-blue-500 hover:bg-blue-600' },
  DEATH: { label: 'muerte', color: 'bg-gray-500 hover:bg-gray-600' },
  REQUEST_DINOSAUR: {
    label: 'petición',
    color: 'bg-yellow-500 hover:bg-yellow-600',
  },
  SEND_DINOSAUR: { label: 'envío', color: 'bg-green-500 hover:bg-green-600' },
  ERROR: { label: 'error', color: 'bg-red-500 hover:bg-red-600' },
}

function LogsPage({ goToMap }: { goToMap: () => void }) {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]) // Estado para los logs
  const [activeIsland, setActiveIsland] = useState<'todos' | Island>('todos')
  const [activeType, setActiveType] = useState<'todos' | LogLevel>('todos')

  // Función para obtener logs del servidor
  const fetchLogs = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/public/api/v1/logs'
      )
      setAuditLogs(response.data) // Actualizar estado con los logs obtenidos
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }

  // Polling continuo con un intervalo de 1 segundo
  useEffect(() => {
    const interval = setInterval(fetchLogs, 1000) // Llamadas cada segundo
    return () => clearInterval(interval) // Limpiar intervalo al desmontar
  }, [])

  const filteredLogs = auditLogs.filter((log) => {
    const islandMatch = activeIsland === 'todos' || log.island === activeIsland
    const typeMatch = activeType === 'todos' || log.level === activeType
    return islandMatch && typeMatch
  })

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <img
        src={MapIcon}
        alt='Logs'
        className='w-24 h-24 absolute top-32 left-20 border border-4 border-black p-4 rounded-3xl bg-cyan-500 bg-opacity-30 cursor-pointer'
        onClick={goToMap}
      />
      <div className='flex h-3/4 w-3/4'>
        <Tabs
          defaultValue='todos'
          className='w-[120px] border-r'
          orientation='vertical'
        >
          <TabsList className='flex flex-col h-full justify-start gap-10 pt-14'>
            <TabsTrigger
              className='w-full'
              value='todos'
              onClick={() => setActiveType('todos')}
            >
              Todos
            </TabsTrigger>
            <TabsTrigger
              className='w-full'
              value='MEASUREMENT'
              onClick={() => setActiveType('MEASUREMENT')}
            >
              Sensores
            </TabsTrigger>
            <TabsTrigger
              className='w-full'
              value='DEATH'
              onClick={() => setActiveType('DEATH')}
            >
              Muertes
            </TabsTrigger>
            <TabsTrigger
              className='w-full'
              value='REQUEST_DINOSAUR'
              onClick={() => setActiveType('REQUEST_DINOSAUR')}
            >
              Peticiones
            </TabsTrigger>
            <TabsTrigger
              className='w-full'
              value='SEND_DINOSAUR'
              onClick={() => setActiveType('SEND_DINOSAUR')}
            >
              Envíos
            </TabsTrigger>
            <TabsTrigger value='ERROR' onClick={() => setActiveType('ERROR')}>
              Errores
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className='flex-1'>
          <Tabs
            value={activeIsland}
            onValueChange={(value) =>
              setActiveIsland(value as 'todos' | Island)
            }
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-5'>
              <TabsTrigger value='todos'>Todos</TabsTrigger>
              <TabsTrigger value='Isla 1'>Isla 1</TabsTrigger>
              <TabsTrigger value='Isla 2'>Isla 2</TabsTrigger>
              <TabsTrigger value='Isla 3'>Isla 3</TabsTrigger>
              <TabsTrigger value='Centro de Crianza'>
                Centro de Crianza
              </TabsTrigger>
            </TabsList>
            <TabsContent value={activeIsland}>
              <ScrollArea className='h-[630px] w-full rounded-md border p-4'>
                <div className='space-y-4'>
                  {filteredLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className='flex items-start justify-between border-b pb-2'
                    >
                      <div>
                        <p className='text-sm font-medium'>{entry.message}</p>
                        <p className='text-xs text-gray-500'>
                          {entry.timestamp}
                        </p>
                        <p className='text-xs text-gray-500'>{entry.island}</p>
                      </div>
                      <Badge
                        variant='default'
                        className={`${
                          logTypeInfo[entry.level].color
                        } text-white`}
                      >
                        {logTypeInfo[entry.level].label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <button
              onClick={() => generatePDF({ logEntries: filteredLogs })}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Descargar Logs
            </button>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default LogsPage
