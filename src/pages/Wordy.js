import React from 'react'
import FlashcardList from './Card/FlashCards'
export default function Wordy() {
 

  return (
    <div className="mt-24 md:w-3/4 -sm:w-[500px] mx-auto h-full">
      <div className='mx-auto p-2  text-5xl font-bold select-none bg-gradient-to-tr from-gray-200 rounded-md to-gray-700 w-fit'>Wordy</div>
      <FlashcardList words={words} />
    </div>
  )
}
export const words = [
  { 
    enWord: 'Equilibrium', 
    trWord: 'Denge', 
    enSentence: 'The chemical equilibrium is achieved when the rate of the forward reaction equals the rate of the reverse reaction.', 
    trSentence: 'Kimyasal denge, ileri reaksiyon hızı ters reaksiyon hızına eşit olduğunda sağlanır.' 
  },
  { 
    enWord: 'Assimilation', 
    trWord: 'Özümseme', 
    enSentence: 'The assimilation of nutrients is essential for cellular growth and function.', 
    trSentence: 'Besinlerin özümsenmesi, hücresel büyüme ve işlev için gereklidir.' 
  },
  { 
    enWord: 'Inhibit', 
    trWord: 'Engellemek', 
    enSentence: 'High levels of stress can inhibit the immune system, making the body more susceptible to infections.', 
    trSentence: 'Yüksek düzeyde stres, bağışıklık sistemini engelleyebilir ve vücudu enfeksiyonlara daha duyarlı hale getirebilir.' 
  },
  { 
    enWord: 'Disparity', 
    trWord: 'Eşitsizlik', 
    enSentence: 'The disparity in healthcare access remains a critical issue in socio-economic policy discussions.', 
    trSentence: 'Sağlık hizmetlerine erişimdeki eşitsizlik, sosyo-ekonomik politika tartışmalarında önemli bir sorun olarak kalmaktadır.' 
  },
  { 
    enWord: 'Ambiguity', 
    trWord: 'Belirsizlik', 
    enSentence: 'The ambiguity of the research results has led to further studies to clarify the findings.', 
    trSentence: 'Araştırma sonuçlarının belirsizliği, bulguları netleştirmek için daha fazla çalışmaya yol açmıştır.' 
  },
  { 
    enWord: 'Quantitative', 
    trWord: 'Nicel', 
    enSentence: 'Quantitative analysis is crucial for the accurate measurement of chemical compounds in research.', 
    trSentence: 'Araştırmalarda kimyasal bileşiklerin doğru ölçümü için nicel analiz hayati öneme sahiptir.' 
  },
  { 
    enWord: 'Proliferation', 
    trWord: 'Çoğalma', 
    enSentence: 'The rapid proliferation of technology has significantly impacted various industries worldwide.', 
    trSentence: 'Teknolojinin hızlı çoğalması, dünya çapında çeşitli endüstrileri önemli ölçüde etkilemiştir.' 
  },
  { 
    enWord: 'Hypothesis', 
    trWord: 'Hipotez', 
    enSentence: 'The hypothesis was tested through a series of experiments designed to observe potential outcomes.', 
    trSentence: 'Hipotez, olası sonuçları gözlemlemek için tasarlanmış bir dizi deneyle test edildi.' 
  },
  { 
    enWord: 'Intrinsic', 
    trWord: 'Doğal', 
    enSentence: 'Intrinsic motivation is driven by an internal desire to achieve personal satisfaction.', 
    trSentence: 'Doğal motivasyon, kişisel tatmin elde etme isteğiyle yönlendirilir.' 
  },
  { 
    enWord: 'Paradigm', 
    trWord: 'Örneklem', 
    enSentence: 'The study aims to challenge the current paradigm in climate science by presenting new data.', 
    trSentence: 'Çalışma, yeni veriler sunarak iklim bilimi alanındaki mevcut örneklemi sorgulamayı amaçlıyor.' 
  }
];