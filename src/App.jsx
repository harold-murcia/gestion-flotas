import { useEffect, useState } from 'react'
import './App.css'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import firestore from './firebase';

export default function App() {
  const [busList, setBusList] = useState()
  const [categoryList, setCategoryList] = useState()
  const [driverList, setDriverList] = useState()

  // console.log('categoryList', categoryList)
  // console.log('busList', busList)

  async function getCollection(collectionName) {
    const collectionList = await getDocs(collection(firestore, collectionName));
    return collectionList.docs.map(doc => doc.data());
  }

  useEffect(() => {
    const fetchData = async () => {
      const busList = await getCollection('bus');
      const driverList = await getCollection('driver');
      const categoryList = await getCollection('categories');

      setBusList(busList);
      setDriverList(driverList);
      setCategoryList(categoryList);
    };

    fetchData();
  }, []);

  async function sendData(data) {
    // get next id
    const collectionList = await getDocs(collection(firestore, 'register'));
    const docList = collectionList.docs.map(doc => Number(doc.id));
    const nextId = String(Math.max(...docList.map(Number)) + 1).padStart(3, '0')
    console.log(nextId)

    // save
    try {
      const registerDocumentRoute = doc(firestore, 'register', nextId)
      await setDoc(registerDocumentRoute, data);
    } catch (error) {
      console.error(error);
    }
  }

  function createSelect(sectionName, objectKey, docList, selectId) {
    return (
      <div>
        {sectionName + ' '}
        <select name={selectId} id={selectId}>
          {docList?.map((item) => {
            const keyValue = item[objectKey];
            return <option key={keyValue} value={keyValue}>{keyValue}</option>
          })}
        </select>
      </div>
    )
  }

  function submitForm(event) {
    event.preventDefault()
    const getValue = name => event.target.elements.namedItem(name).value;

    sendData({
      date: getValue('date'),
      bus: getValue('bus'),
      driver: getValue('driver'),
      category: getValue('category'),
      value: getValue('value')
    })
  }

  return (
    <>
      <h1>App de buses</h1>
      <form className="card" onSubmit={submitForm}>
        <div>
          {'Fecha '}
          <input type='date' name='date' />
        </div>
        <section>
          {createSelect('Bus', 'plate', busList, 'bus')}
          {createSelect('Conductor', 'name', driverList, 'driver')}
          {createSelect('Categoría', 'name', categoryList, 'category')}
        </section>
        <div>
          {'Valor '}
          <input name='value' />
        </div>
        <button type='submit'>Guardar</button>
      </form>
    </>
  )
}
