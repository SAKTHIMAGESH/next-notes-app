import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import {Button, Card, Container} from 'semantic-ui-react';

const Home=({ notes })=>{
  return (
    <div className='notes-container'>
      <h1>Notes</h1>
      <div className='grid wrapper'>
        {
          notes && notes.map(note=>{
              return (
                <div key={note._id}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Link href={`/${note._id}`}>
                            <a>{note.title}</a>
                        </Link>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Link href={`/${note._id}`}>
                        <Button primary>View</Button>
                      </Link>
                      <Link href={`/${note._id}/edit`}>
                        <Button primary>Edit</Button>
                      </Link>
                    </Card.Content>
                  </Card>
                </div>
              )
          })
        }
      </div>
    </div>
  )
}

Home.getInitialProps = async()=>{
  const res = await fetch(`${process.env.HOST}api/notes`)
  const { data } = await res.json();
  return {
    notes: data
  }
}

export default Home;