export default interface IStore {
  _id: string | null
  title: string
  logo: string | null
  desc: string | null
  location: { lng: string; lat: string } | null
  contacts: {
    tel: string
    whats: string
    phone: string
    telegram: string
    email: string
  } | null
  workOn: string[] | null
  social: {
    insta: string
    twitter: string
    fb: string
    yt: string
    snap: string
    tiktok: string
  } | null
  otherLinks: {
    link: string
    android: string
    apple: string
  } | null
  reviewed: boolean
  approved: boolean
  files: []
}
