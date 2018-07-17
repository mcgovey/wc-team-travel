export default function createArcs(passedData, filter) {
  if(!passedData || !filter) return null;

  let data = passedData.map(d => {
    let rD = d;
    if(!Array.isArray(rD.fromCoords)){
      rD.fromCoords = JSON.parse(d.fromCoords);
      rD.toCoords = JSON.parse(d.toCoords);
    }
    return rD;
  });

  data = data.filter((d) => d.playingTeam === filter || filter === 'ALL');

  console.log('passedData', data);
  return data;
}
