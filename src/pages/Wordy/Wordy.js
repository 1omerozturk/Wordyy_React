import React, { useEffect, useState } from 'react'
import FlashcardList from '../Card/FlashCards'
import { NavLink } from 'react-router-dom';
import { getAllWords } from '../../api/api';
export default function Wordy() {
  const [wordyData, setWordyData] = useState([])

  const loadData = () => {
    getAllWords().then((data) => {
      setWordyData(data)
      console.log(typeof(data))
    })
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="mt-5 md:w-3/4 -sm:w-[500px] mx-auto h-full">
      <div className='mx-auto p-2  text-5xl font-bold select-none bg-gradient-to-tr from-gray-200 rounded-md to-gray-700 w-fit'>Wordy Cards</div>
       <NavLink
       className="flex items-center justify-end animate-pulse hover:animate-none"
       style={{textDecoration:'none'}}
       to="/wordyadd">
      <div className='hover:bg-purple-500 text-purple-500 p-1 border-2 border-purple-500 hover:text-black rounded-md flex  mt-2 w-fit'>Wordy Add</div>
      </NavLink>
      <FlashcardList words={wordyData} />
    
    </div>
  )
}
export const words = [
  { 
    enWord: 'Equilibrium', 
    trWord: 'Denge', 
    image:'https://openclipart.org/image/800px/172947',
    enSentence: 'The chemical equilibrium is achieved when the rate of the forward reaction equals the rate of the reverse reaction.', 
    trSentence: 'Kimyasal denge, ileri reaksiyon hızı ters reaksiyon hızına eşit olduğunda sağlanır.' 
  },
  { 
    enWord: 'Assimilation', 
    trWord: 'Özümseme', 
    enSentence: 'The assimilation of nutrients is essential for cellular growth and function.', 
    imaage:'',
    trSentence: 'Besinlerin özümsenmesi, hücresel büyüme ve işlev için gereklidir.' 
  },
  { 
    enWord: 'Inhibit', 
    trWord: 'Engellemek', 
    image:'',
    enSentence: 'High levels of stress can inhibit the immune system, making the body more susceptible to infections.', 
    trSentence: 'Yüksek düzeyde stres, bağışıklık sistemini engelleyebilir ve vücudu enfeksiyonlara daha duyarlı hale getirebilir.' 
  },
  { 
    enWord: 'Disparity', 
    trWord: 'Eşitsizlik', 
    image:'https://openclipart.org/image/800px/270258',
    enSentence: 'The disparity in healthcare access remains a critical issue in socio-economic policy discussions.', 
    trSentence: 'Sağlık hizmetlerine erişimdeki eşitsizlik, sosyo-ekonomik politika tartışmalarında önemli bir sorun olarak kalmaktadır.' 
  },
  { 
    enWord: 'Ambiguity', 
    trWord: 'Belirsizlik', 
    image:'https://openclipart.org/image/800px/206046',
    enSentence: 'The ambiguity of the research results has led to further studies to clarify the findings.', 
    trSentence: 'Araştırma sonuçlarının belirsizliği, bulguları netleştirmek için daha fazla çalışmaya yol açmıştır.' 
  },
  { 
    enWord: 'Quantitative', 
    trWord: 'Nicel', 
    image:'https://openclipart.org/image/800px/202852',
    enSentence: 'Quantitative analysis is crucial for the accurate measurement of chemical compounds in research.', 
    trSentence: 'Araştırmalarda kimyasal bileşiklerin doğru ölçümü için nicel analiz hayati öneme sahiptir.' 
  },
  { 
    enWord: 'Proliferation', 
    trWord: 'Çoğalma', 
    image:'',
    enSentence: 'The rapid proliferation of technology has significantly impacted various industries worldwide.', 
    trSentence: 'Teknolojinin hızlı çoğalması, dünya çapında çeşitli endüstrileri önemli ölçüde etkilemiştir.' 
  },
  { 
    enWord: 'Hypothesis', 
    trWord: 'Hipotez', 
    image:'https://openclipart.org/image/800px/276088',
    enSentence: 'The hypothesis was tested through a series of experiments designed to observe potential outcomes.', 
    trSentence: 'Hipotez, olası sonuçları gözlemlemek için tasarlanmış bir dizi deneyle test edildi.' 
  },
  { 
    enWord: 'Intrinsic', 
    trWord: 'Doğal', 
    image:'',
    enSentence: 'Intrinsic motivation is driven by an internal desire to achieve personal satisfaction.', 
    trSentence: 'Doğal motivasyon, kişisel tatmin elde etme isteğiyle yönlendirilir.' 
  },
  { 
    enWord: 'Paradigm', 
    trWord: 'Örneklem', 
    image:'',
    enSentence: 'The study aims to challenge the current paradigm in climate science by presenting new data.', 
    trSentence: 'Çalışma, yeni veriler sunarak iklim bilimi alanındaki mevcut örneklemi sorgulamayı amaçlıyor.' 
  }
];