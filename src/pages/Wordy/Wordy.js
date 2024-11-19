import React, { useEffect, useState } from 'react'
import FlashcardList from '../Card/FlashCards'
import { NavLink, Outlet } from 'react-router-dom';
import { getAllWords } from '../../api/api';
export default function Wordy() {
  const [wordyData, setWordyData] = useState([])

  const loadData = () => {
    getAllWords().then((data) => {
      setWordyData(data)
    })
  }
  useEffect(() => {
    loadData()
  }, [wordyData])

  return (
    <div className="mt-5 md:w-3/4 -sm:w-[500px] mx-auto h-full">
        <Outlet/>
      <div className='mx-auto p-2  text-5xl font-bold select-none bg-gradient-to-tr from-gray-200 rounded-md to-gray-700 w-fit'>Wordy Cards</div>
       <NavLink
       className="flex items-center justify-end animate-pulse hover:animate-none"
       style={{textDecoration:'none'}}
       to="/wordyadd">
      <div className='hover:bg-purple-500 bg-black hover:text-purple-500 text-purple-500 p-1 border-2 border-purple-500 hover:text-black rounded-md flex  mt-2 w-fit'>Wordy Add</div>
      </NavLink>
      <FlashcardList words={wordyData} />
    
  
    </div>
  )
}
export const words = [
  { 
    english: 'Equilibrium', 
    turkish: 'Denge', 
    image:'https://openclipart.org/image/800px/172947',
    englishExample: 'The chemical equilibrium is achieved when the rate of the forward reaction equals the rate of the reverse reaction.', 
    turkishExample: 'Kimyasal denge, ileri reaksiyon hızı ters reaksiyon hızına eşit olduğunda sağlanır.' 
  },
  { 
    english: 'Assimilation', 
    turkish: 'Özümseme', 
    englishExample: 'The assimilation of nutrients is essential for cellular growth and function.', 
    imaage:'',
    turkishExample: 'Besinlerin özümsenmesi, hücresel büyüme ve işlev için gereklidir.' 
  },
  { 
    english: 'Inhibit', 
    turkish: 'Engellemek', 
    image:'',
    englishExample: 'High levels of stress can inhibit the immune system, making the body more susceptible to infections.', 
    turkishExample: 'Yüksek düzeyde stres, bağışıklık sistemini engelleyebilir ve vücudu enfeksiyonlara daha duyarlı hale getirebilir.' 
  },
  { 
    english: 'Disparity', 
    turkish: 'Eşitsizlik', 
    image:'https://openclipart.org/image/800px/270258',
    englishExample: 'The disparity in healthcare access remains a critical issue in socio-economic policy discussions.', 
    turkishExample: 'Sağlık hizmetlerine erişimdeki eşitsizlik, sosyo-ekonomik politika tartışmalarında önemli bir sorun olarak kalmaktadır.' 
  },
  { 
    english: 'Ambiguity', 
    turkish: 'Belirsizlik', 
    image:'https://openclipart.org/image/800px/206046',
    englishExample: 'The ambiguity of the research results has led to further studies to clarify the findings.', 
    turkishExample: 'Araştırma sonuçlarının belirsizliği, bulguları netleştirmek için daha fazla çalışmaya yol açmıştır.' 
  },
  { 
    english: 'Quantitative', 
    turkish: 'Nicel', 
    image:'https://openclipart.org/image/800px/202852',
    englishExample: 'Quantitative analysis is crucial for the accurate measurement of chemical compounds in research.', 
    turkishExample: 'Araştırmalarda kimyasal bileşiklerin doğru ölçümü için nicel analiz hayati öneme sahiptir.' 
  },
  { 
    english: 'Proliferation', 
    turkish: 'Çoğalma', 
    image:'',
    englishExample: 'The rapid proliferation of technology has significantly impacted various industries worldwide.', 
    turkishExample: 'Teknolojinin hızlı çoğalması, dünya çapında çeşitli endüstrileri önemli ölçüde etkilemiştir.' 
  },
  { 
    english: 'Hypothesis', 
    turkish: 'Hipotez', 
    image:'https://openclipart.org/image/800px/276088',
    englishExample: 'The hypothesis was tested through a series of experiments designed to observe potential outcomes.', 
    turkishExample: 'Hipotez, olası sonuçları gözlemlemek için tasarlanmış bir dizi deneyle test edildi.' 
  },
  { 
    english: 'Intrinsic', 
    turkish: 'Doğal', 
    image:'',
    englishExample: 'Intrinsic motivation is driven by an internal desire to achieve personal satisfaction.', 
    turkishExample: 'Doğal motivasyon, kişisel tatmin elde etme isteğiyle yönlendirilir.' 
  },
  { 
    english: 'Paradigm', 
    turkish: 'Örneklem', 
    image:'',
    englishExample: 'The study aims to challenge the current paradigm in climate science by presenting new data.', 
    turkishExample: 'Çalışma, yeni veriler sunarak iklim bilimi alanındaki mevcut örneklemi sorgulamayı amaçlıyor.' 
  }
];