const KEYS = {
    machines:'machines',
    machineId:'machineId'
}

export const getUnitCollection = () =>([
    { id:'1', title:'Unité 1'},
    { id:'2', title:'Unité 2'},
])

export function insertMachine(data) {
    let machines=getAllMachines();
    data['id'] = generateMachineId()
    machines.push(data)
    localStorage.setItem(KEYS.machines,JSON.stringify(machines))
}

export function updateMachine(data) {
    let machines=getAllMachines();
    let recordIndex = machines.findIndex(x => x.id == data.id);
    
    machines[recordIndex] = { ...data }
    localStorage.setItem(KEYS.machines,JSON.stringify(machines))
}

export function deleteMachine(id) {
    let machines=getAllMachines();
    machines = machines.filter(x => x.id != id);
    localStorage.setItem(KEYS.machines,JSON.stringify(machines))
}

export function generateMachineId() {
    if (localStorage.getItem(KEYS.machineId) == null)
        localStorage.setItem(KEYS.machineId, '0')
    var id = parseInt(localStorage.getItem(KEYS.machineId))
    localStorage.setItem(KEYS.machineId, (id++).toString())
    return id;
}

export function getAllMachines() {
    if (localStorage.getItem(KEYS.machines) == null)
        localStorage.setItem(KEYS.machines, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.machines));
}