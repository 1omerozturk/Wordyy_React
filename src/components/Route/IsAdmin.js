import { getUser } from '../../api/api';

const isAdmin = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user?._id) return false // Kullanıcı yoksa false döner

  try {
    const res = await getUser(user._id) // API çağrısını bekle
    return res.role === 'admin' // Admin mi kontrol et
  } catch (error) {
    console.error('API hatası:', error)
    return false // Hata durumunda false döner
  }
}

export default isAdmin
