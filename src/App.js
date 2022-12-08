import './App.css';
import {useEffect, useState} from "react";
import algoliasearch from 'algoliasearch';

function App() {
    const [term, setTerm] = useState('')
    const [index, setIndex] = useState()
    const [results, setResults] = useState([])

    const handleSubmit = async e => {
        e.preventDefault()
        if (index){
            console.log(`Searching for term: ${term}`)
            const res = await index.search(term)
            console.log(res)
            res.hits.forEach(it => {
                console.log(JSON.stringify(it))
            })
            setResults(res.hits)
        }
    }
    useEffect(() => {
        const client = algoliasearch('0HJBNDV358', 'NO_KEY', {hosts: [
            {url: 'algolia.invaluable.com'}
        ]})
        console.log(`Client: ${JSON.stringify(client)}`)
        const index = client.initIndex('upcoming_lots_prod')
        setIndex(index)
        console.log(`Index: ${JSON.stringify(index)}`)
        return () => {
            if (client){
                // client.destroy()
            }
        }
    }, [])
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
          <input type="text" value={term} onChange={e => setTerm(e.target.value)} placeholder="Search"/>
      </form>
        {results.map(it => (
            <div key={it.lotNumber}>
                <pre>{JSON.stringify(it, null, 2)}</pre>
                <hr/>
            </div>
        ))}
    </div>
  );
}

export default App;
