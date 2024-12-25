import React, { useContext, useEffect, useState } from 'react'
import FlashcardList from '../Card/FlashCards'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { getAllWords } from '../../api/api'
import { Spin } from '../../components/Spinner/Spin'
import { UserContext } from '../User/UserContext'
export default function Wordy() {
  const user = useContext(UserContext)
  const [userId, setUserId] = useState('')
  const [index, setIndex] = useState(0)
  const [wordyData, setWordyData] = useState({})
  const [acvite, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation()


  const loadData = () => {
    getAllWords().then((data) => {
      setWordyData(data)
      setInterval(() => {
        setLoading(true)
      }, 400)
    })
  }
  useEffect(() => {
    loadData()
  }, [wordyData,index])

  useEffect(() => {
    if (user?._id) {
      setUserId(user._id)
    }
  }, [user])

  return (
    <div className="pt-5 w-full mx-auto h-fit">
      <Outlet />
      {user && user?.role === 'admin' ? (
        <NavLink
          className={`${
            location.pathname === '/wordy/wordyadd' ? 'collapse' : ''
          } flex items-center justify-end animate-pulse hover:animate-none`}
          to={`${
            location.pathname === '/wordy/wordyadd' ? '/wordy' : 'wordyadd'
          }`}
          style={{ textDecoration: 'none' }}
          onClick={() => setActive(!acvite)}
        >
          <div className="text-white bg-purple-500 hover:bg-purple-800 hover:text-black p-1 border-2 border-indigo-500  rounded-md flex  mt-2 w-fit">
            Wordy Add
          </div>
        </NavLink>
      ) : (
        ''
      )}
      {!loading ? (
        <div className="text-center">
          <Spin color={'warning'} />
        </div>
      ) : (
        <div>

        <FlashcardList words={wordyData} index={index} setIndex={setIndex} />
        
        <div className="grid grid-flow-col text-center mx-auto max-w-fit gap-4 px-5 overflow-x-auto mt-5">
        {wordyData.map((_, idx) => {
          const isCurrent = idx === index // Şu anki wordy
          const baseClass = 'rounded-md text-center p-1 border' // Ortak sınıflar
          const bgClass = isCurrent
            ? 'bg-slate-600' // Şu anki wordy
            : 'bg-slate-200' 

            return (
              <div key={idx} className={`${baseClass} ${bgClass} cursor-pointer my-2 px-2`} onClick={() => setIndex(idx)} title={_.english} >
              {idx + 1}
            </div>
          )
        })}
        </div>
      </div>
      )}
    </div>
  )
}
export const words = [
  {
    english: 'Equilibrium',
    turkish: 'Denge',
    image: 'https://openclipart.org/image/800px/172947',
    englishExample:
      'The chemical equilibrium is achieved when the rate of the forward reaction equals the rate of the reverse reaction.',
    turkishExample:
      'Kimyasal denge, ileri reaksiyon hızı ters reaksiyon hızına eşit olduğunda sağlanır.',
  },
  {
    english: 'Assimilation',
    turkish: 'Özümseme',
    englishExample:
      'The assimilation of nutrients is essential for cellular growth and function.',
    imaage: '',
    turkishExample:
      'Besinlerin özümsenmesi, hücresel büyüme ve işlev için gereklidir.',
  },
  {
    english: 'Inhibit',
    turkish: 'Engellemek',
    image: '',
    englishExample:
      'High levels of stress can inhibit the immune system, making the body more susceptible to infections.',
    turkishExample:
      'Yüksek düzeyde stres, bağışıklık sistemini engelleyebilir ve vücudu enfeksiyonlara daha duyarlı hale getirebilir.',
  },
  {
    english: 'Disparity',
    turkish: 'Eşitsizlik',
    image: 'https://openclipart.org/image/800px/270258',
    englishExample:
      'The disparity in healthcare access remains a critical issue in socio-economic policy discussions.',
    turkishExample:
      'Sağlık hizmetlerine erişimdeki eşitsizlik, sosyo-ekonomik politika tartışmalarında önemli bir sorun olarak kalmaktadır.',
  },
  {
    english: 'Ambiguity',
    turkish: 'Belirsizlik',
    image: 'https://openclipart.org/image/800px/206046',
    englishExample:
      'The ambiguity of the research results has led to further studies to clarify the findings.',
    turkishExample:
      'Araştırma sonuçlarının belirsizliği, bulguları netleştirmek için daha fazla çalışmaya yol açmıştır.',
  },
  {
    english: 'Quantitative',
    turkish: 'Nicel',
    image: 'https://openclipart.org/image/800px/202852',
    englishExample:
      'Quantitative analysis is crucial for the accurate measurement of chemical compounds in research.',
    turkishExample:
      'Araştırmalarda kimyasal bileşiklerin doğru ölçümü için nicel analiz hayati öneme sahiptir.',
  },
  {
    english: 'Proliferation',
    turkish: 'Çoğalma',
    image: '',
    englishExample:
      'The rapid proliferation of technology has significantly impacted various industries worldwide.',
    turkishExample:
      'Teknolojinin hızlı çoğalması, dünya çapında çeşitli endüstrileri önemli ölçüde etkilemiştir.',
  },
  {
    english: 'Hypothesis',
    turkish: 'Hipotez',
    image: 'https://openclipart.org/image/800px/276088',
    englishExample:
      'The hypothesis was tested through a series of experiments designed to observe potential outcomes.',
    turkishExample:
      'Hipotez, olası sonuçları gözlemlemek için tasarlanmış bir dizi deneyle test edildi.',
  },
  {
    english: 'Intrinsic',
    turkish: 'Doğal',
    image: '',
    englishExample:
      'Intrinsic motivation is driven by an internal desire to achieve personal satisfaction.',
    turkishExample:
      'Doğal motivasyon, kişisel tatmin elde etme isteğiyle yönlendirilir.',
  },
  {
    english: 'Paradigm',
    turkish: 'Örneklem',
    image: '',
    englishExample:
      'The study aims to challenge the current paradigm in climate science by presenting new data.',
    turkishExample:
      'Çalışma, yeni veriler sunarak iklim bilimi alanındaki mevcut örneklemi sorgulamayı amaçlıyor.',
  },
]
