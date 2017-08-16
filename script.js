function ev(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutatedPosition = _.random(populationSize - 1)
    let toBeMutated = population[ toBeMutatedPosition ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutate(toBeMutated, 1.0)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
    {
       population[contenderPosition] = mutated
    }
  }

  printResults(graph, population, graphType);

}

function evc(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutatedPosition = _.random(populationSize - 1)
    let parent1Position = _.random(populationSize - 1)
    let parent2Position = _.random(populationSize - 1)
    let parent1 = population[parent1Position];
    let parent2 = population[parent2Position];
    let child = cross(parent1, parent2)
    let toBeMutated = population[ toBeMutatedPosition ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutate(toBeMutated, 1.0)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
    {
       population[contenderPosition] = mutated
    }

    if (fit(child, graph) > fit(parent1, graph)) {
        population[parent1Position] = child
    }
    else if (fit(child, graph) > fit(parent2, graph)) {
      population[parent2Position] = child
    }
  }

  printResults(graph, population, graphType);

}

function eva(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutatedPosition = _.random(populationSize - 1)
    let toBeMutated = population[ toBeMutatedPosition ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutate(toBeMutated, (generations - i + 1)/generations)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
    {
       population[contenderPosition] = mutated
    }
  }

  printResults(graph, population, graphType);
}

function evac(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutatedPosition = _.random(populationSize - 1)
    let parent1Position = _.random(populationSize - 1)
    let parent2Position = _.random(populationSize - 1)
    let parent1 = population[parent1Position];
    let parent2 = population[parent2Position];
    let child = cross(parent1, parent2)
    let toBeMutated = population[ toBeMutatedPosition ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutate(toBeMutated, (generations - i + 1)/generations)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
    {
       population[contenderPosition] = mutated
    }

    if (fit(child, graph) > fit(parent1, graph)) {
        population[parent1Position] = child
    }
    else if (fit(child, graph) > fit(parent2, graph)) {
      population[parent2Position] = child
    }
  }

  printResults(graph, population, graphType);
}

function evacnm(n, m, graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    for (let j = 0; j <= n; i++) {
      let toBeMutatedPosition = _.random(populationSize - 1)
      let parent1Position = _.random(populationSize - 1)
      let parent2Position = _.random(populationSize - 1)
      let parent1 = population[parent1Position];
      let parent2 = population[parent2Position];
      let child = cross(parent1, parent2)
      let toBeMutated = population[ toBeMutatedPosition ]
      let mutated = mutate(toBeMutated, (generations - i + 1)/generations)

      for (let k = 0; k < m; k++) {
        let contenderPosition = _.random(populationSize - 1)
        if(fit(mutated, graph) > fit(population[contenderPosition], graph))
        {
           population[contenderPosition] = mutated;
           break;
        }
      }

      if (fit(child, graph) > fit(parent1, graph)) {
          population[parent1Position] = child
      }
      else if (fit(child, graph) > fit(parent2, graph)) {
        population[parent2Position] = child
      }

    }
  }

  printResults(graph, population, graphType);

}

function memetic(graph, populationSize, generations, graphType){

  // function EVA(1, 1)(p, g)
  // pop ← a new array with p elements
  // for i ∈ 1, 2, . . . , p do
  // pop[i] ← gen()
  // for j ∈ 1, 2, . . . , g do
  // x, y ← two random elements of pop
  // x' ← mut((x, g−j+1 )/ g)
  // )
  // if fit(x') > fit(y) then
  // Replace y with x'
  // return pop

}

const improve = (individual, depth, numberOfNodes) =>{

  //when doing memetic search
}

const printResults = (graph, population, graphType) =>
{
  let bucket = document.getElementById("wrapper");
  bucket.innerHTML += `<h1>${graphType}</h1>`

  for (let i = 0; i < population.length; i++) {
    let aux = "";
    individual = population[i];
    let fitness = fit(individual,graph);
    aux += `<p ${fitness === -1 ? "style=\"color:#f46b42;\"": ""}>Individual <b>${i}: &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    aux += `Fitness: <b>${fitness} &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    aux += `Colours used: <b>${totalColoursUsed(individual)} &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    aux += `Clashes: <b>${hasClashes(graph, individual)} &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    for (let j = 0; j < individual.length; j++) {
       aux += `${individual[j].colour}, `
    }
    aux += `</p>`;
    bucket.innerHTML += aux;
  }

  bucket.innerHTML += `<br/>`

}

const hasClashes = (graph, individual) =>{

  let graphOrder = graph.length

  for (let i = 0; i < graphOrder; i++) {
    for (let j = 0; j < graphOrder; j++) {
        if(graph[i][j] === 1 && individual[i].colour === individual[j].colour) return true;
    }
  }

  return false;
}

const totalColoursUsed = (individual) => {

  let colours = new Set();

  for (let colour of individual) {
     colours.add(colour.colour)
  }
  return colours.size
}

const fit = (individual, adjacencyMatrix) => {
     let clashes = hasClashes(adjacencyMatrix, individual)
     if (clashes) {
       return -1;
     }
     else {
        let coloursUsed = totalColoursUsed(individual)
        return adjacencyMatrix.length - coloursUsed;
     }
}

const getColours = (numberOfColours) => {
  let colours = []

  // generate an array with as many colours as the graph order
  for (let j = 1; j <= numberOfColours; j++){
    colours.push(j*100);
   }

   return colours;
}

const mutate = (individual, s) =>{
  let rate = Math.round((individual.length)/2 * s)
  let colors = getColours(individual.length);

  for (let i = 0; i < rate; i++) {
    const colour = colors.splice( _.random(colors.length-1), 1 );
    individual[ _.random(individual.length -1) ].colour = colour[0];
  }

  return individual;
}

const cross = (individual1, individual2) =>{

  let partitionIndex = _.random(individual1.length -1);
  let coinFlip = _.random(0,1);

  if (coinFlip) {
    return individual1.slice(0, partitionIndex + 1).concat(individual2.slice(partitionIndex , individual2.length - 1))
  }
  else {
    return individual2.slice(0, partitionIndex + 1).concat(individual1.slice(partitionIndex , individual1.length - 1))
  }

}

const generateInitialPopulation = (graphOrder, populationSize) => {

   const individuals = []

   for(let i = 1; i <= populationSize; i++){

     let individual = [];

     let colors = getColours(graphOrder);

     for (let k = 0; k < graphOrder; k++) {
         const color = colors.splice( _.random(colors.length-1), 1 )
         individual.push({ colour: color[0] });
     }

     individuals.push(individual)

   }

   return individuals
}

const petersen = [
  [0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 1, 0, 0]
];

const crown = [
  [0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0]
];

const wheel = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];


 evc(crown, 10, 100000, "Crown (8)")
 evc(petersen, 10, 100000, "Petersen (10)")
 evc(wheel, 10, 100000, "Wheel (12)")
