import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered-2.png';
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/GridItem';
import { levels, calculateImc, Level } from "./helpers/imc";

const App = () => {

  const [heightField, setHightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
  const calculateButton = () => {
    if(heightField && weightField) {
     setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Todos os campos devem estar preenchidos!');
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={50} height={28}/>
          <p className={styles.pLink}>
            powered by
            <a target="_blank"
               rel="noreferrer noopener"
               href="https://github.com/MTaranto"> Márcio Taranto
            </a>
          </p>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p className={styles.pIMC}>IMC é a sigla para Índice de Massa Corporal,
            parâmetro adotado pela Organização Mundial de Saúde
            para calcular o peso ideal de cada pessoa, de acordo
            com a sua altura.
          </p>
          <input
            type='number'
            placeholder='Digite a sua altura em metros. Ex: 1.80 (m)'
            value={heightField > 0 ? heightField : ''} // para não ficar o zero no lugar do placeholder
            onChange={e => setHightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
            />
          <input
            type='number'
            placeholder='Digite o seu peso em Quilos. Ex: 79.5 (kg) '
            value={weightField > 0 ? weightField : ''} // para não ficar o zero no lugar do placeholder
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
            />
            <button
              onClick={calculateButton}
              disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App;