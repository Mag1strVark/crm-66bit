import { useState, ChangeEvent, FormEvent } from 'react'
import { useTypedDispatch } from 'hooks/redux.ts'
import { postDepartment } from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { IDepartment } from 'models/IDepartment.ts'

interface IFormData {
  logo: string
  name: string
  businessList: { value: string; label: string }[]
  businessName: string
  categoryName: string
  address: string
  latitude: number
  longitude: number
  country: string
  city: string
  zoom: number
  phone_number: string
  work_time: string
  availableAddresses: {
    address: string
    latitude: string
    longitude: string
    country: string
    city: string
  }[]
}

export const UseCreateForm = () => {
  const dispatch = useTypedDispatch()
  const [formData, setFormData] = useState<IFormData>({
    logo: '',
    name: '',
    businessList: [
      { value: 'Финансы и инвестиции', label: 'Финансы и инвестиции' },
      {
        value: 'Технологии и информационные технологии',
        label: 'Технологии и информационные технологии',
      },
      {
        value: 'Здравоохранение и медицина',
        label: 'Здравоохранение и медицина',
      },
      { value: 'Розничная торговля', label: 'Розничная торговля' },
      {
        value: 'Производство и инжиниринг',
        label: 'Производство и инжиниринг',
      },
      {
        value: 'Гостинично-ресторанный бизнес',
        label: 'Гостинично-ресторанный бизнес',
      },
      { value: 'Образование и тренинги', label: 'Образование и тренинги' },
      { value: 'Реклама и маркетинг', label: 'Реклама и маркетинг' },
      { value: 'Автомобильная индустрия', label: 'Автомобильная индустрия' },
      {
        value: 'Консалтинг и бизнес-услуги',
        label: 'Консалтинг и бизнес-услуги',
      },
    ],
    businessName: '',
    categoryName: '',
    country: '',
    city: '',
    address: '',
    latitude: 56.85279,
    longitude: 60.641887,
    zoom: 8,
    phone_number: '',
    work_time: '',
    availableAddresses: [],
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, businessName: event.target.value })
  }

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value
    setFormData({
      ...formData,
      address,
    })
  }

  const selectAddress = (
    address: string,
    latitude: string,
    longitude: string,
    country: string
  ) => {
    setFormData({
      ...formData,
      address,
      country: country,
      latitude: Number(latitude),
      longitude: Number(longitude),
      availableAddresses: [],
    })
  }

  const SearchAddress = async () => {
    const apiKey = import.meta.env.VITE_API_KEY_YANDEX_MAP
    const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(
      formData.address
    )}&format=json`

    try {
      const response = await fetch(geocodeUrl)
      const data = await response.json()
      const featureMembers = data.response.GeoObjectCollection.featureMember
      const addresses = featureMembers.map((featureMember: any) => {
        const addressDetails =
          featureMember.GeoObject.metaDataProperty.GeocoderMetaData.Address
        const countryDetails =
          featureMember.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country
        const pointDetails = featureMember.GeoObject.Point.pos.split(' ')
        return {
          address: addressDetails.formatted,
          latitude: pointDetails[0],
          longitude: pointDetails[1],
          country: countryDetails.CountryName,
        }
      })

      setFormData({
        ...formData,
        availableAddresses: addresses,
      })
    } catch (error) {
      console.error('Ошибка при получении координат:', error)
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IDepartment = {
      name: formData.name,
      businessArea: formData.businessName,
      categoryName: formData.categoryName,
      city: formData.city,
      country: formData.country,
      phoneNumber: formData.phone_number,
      workMode: formData.work_time,
      location: {
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        zoom: formData.zoom,
      },
    }
    dispatch(postDepartment(data))
  }

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSelectChange,
    handleFormSubmit,
    handleAddressChange,
    SearchAddress,
    selectAddress,
  }
}
