import './AppReset.css'
import styles from './App.module.css'
import { useState } from 'react'
import powered from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'
import { levels, calculateImc, Level } from './helpers/imc'
import { Griditem } from './components/Griditem/index'

function App() {
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [showItem, setShowItem] = useState<Level | null>(null)

  const handleCalculate = () => {
    if (heightField && weightField) {
      setShowItem(calculateImc(heightField, weightField))
    } else {
      alert('Informe os campos!')
    }
  }

  const handleBackButton = () => {
    setShowItem(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
        <header className={styles.headerContainer}>
          <img src={powered} width='180px'/>
        </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro
          adotado pela Organização Mundial de Saúde para 
          calcular o peso ideal de cada pessoa.</p>
          <p>O índice é calculado da seguinte maneira: divide-se o peso do paciente pela sua altura. </p>

          <input 
            type="number"
            placeholder='Digite a sua altura. Ex 1.5 (em métros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={showItem ? true : false}
          />
          <input 
            type="number"
            placeholder='Digite o seu peso. Ex 75.3 (em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={showItem ? true : false}
          />
          <button disabled={showItem ? true : false} onClick={handleCalculate}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSide}>
            {!showItem &&
              <div className={styles.grid}>
                {levels.map((item, key) => (
                  <Griditem key={key} item={item} />
                ))}
              </div> 
            }
            {showItem &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} alt="" width='30px' />
                </div>
                <Griditem item={showItem}/>
              </div>
            }
          </div> 
        </div>
      </div>
    </div>
  )
}

export default App