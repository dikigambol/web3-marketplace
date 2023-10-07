import React, { useEffect, useState } from 'react';
import { fileToDataUri } from "@/utils/imageBlob";
import { useWallet } from '@meshsdk/react';
import Toast from '@/components/Toast';
import { Profile } from '@/type/profile';
import { addUser, getAddress, getProfile, getUsername, updateUser } from '@/lib/axios';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useAppContext } from '@/components/Context';

const initialState = {
  username: '',
  name: '',
  about: '',
  photo: ''
}

export default function EditProfile() {
  const router = useRouter()
  const { connected, wallet } = useWallet();
  const [toastMessage, setToastMessage] = useState<undefined | any>(undefined);
  const [toastType, setToastType] = useState<undefined | any>(undefined);
  const [form, setForm] = useState<Profile[] | any>(initialState)
  const [loading, setLoading] = useState(true);
  const [filled, setFilled] = useState<boolean | any>(undefined)
  const [submit, setSubmit] = useState(false);
  const { updateGlobalState } = useAppContext();

  useEffect(() => {
    async function getInfoAccount() {
      const walletAddress = (await wallet.getUsedAddresses())[0];
      const res = await getUsername(walletAddress)
      if (!res.notfound) {
        const profile = await getProfile(res.username)
        setForm(profile)
        setFilled(true)
        setLoading(false)
      } else {
        setForm((prev) => ({
          ...prev,
          address: walletAddress
        }))
        setFilled(false)
        setLoading(false)
      }
    }
    if (connected) {
      getInfoAccount()
    }
  }, [connected])

  const imgChange = (e) => {
    let file = e.target.files[0]
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!file) {
      setForm((prev) => ({
        ...prev,
        photo: ''
      }))
      return;
    }
    if (!allowedTypes.includes(file.type)) {
      setToastMessage("File must be an image!");
      setToastType("danger");
      setTimeout(() => {
        setToastMessage(undefined);
        setToastType(undefined)
      }, 3000);
      return;
    }
    fileToDataUri(file)
      .then(dataUri => {
        setForm((prev) => ({
          ...prev,
          photo: dataUri
        }))
      })
  }

  const inputChange = (e) => {
    if (e.target.name == "username" && filled) return
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmit(true)
    const isUNExits = await getAddress(form.username)
    let pages = ['market', 'asset', 'myprofile', 'api']
    if (!filled && !isUNExits.notfound) {
      setToastMessage("Username has already exist!");
      setToastType("danger");
      setSubmit(false)
      setTimeout(() => {
        setToastMessage(undefined);
        setToastType(undefined)
      }, 3000);
      return;
    }
    if (pages.includes(form.username)) {
      setToastMessage("Forbidden username!");
      setToastType("danger");
      setSubmit(false)
      setTimeout(() => {
        setToastMessage(undefined);
        setToastType(undefined)
      }, 3000);
      return;
    }
    if (!filled) {
      const res = await addUser(form)
      if (res) {
        setToastMessage("Profile updated");
        setToastType("success");
        setSubmit(false)
        updateGlobalState({ profileChange: true })
        setTimeout(() => {
          setToastMessage(undefined);
          setToastType(undefined);
          router.push(`${form.username}`);
        }, 1000);
      }
    } else {
      const res = await updateUser(form)
      if (res) {
        setToastMessage("Profile updated");
        setToastType("success");
        setTimeout(() => {
          setToastMessage(undefined);
          setToastType(undefined)
        }, 3000);
        setSubmit(false)
      }
    }
  }

  return (
    <>
      {toastMessage && toastType && (
        <Toast
          show={true}
          type={toastType}>
          <p>{toastMessage}</p>
        </Toast>
      )}
      {connected ? (
        <>
          {loading ?
            <div className="flex flex-row justify-center items-center py-24">
              <ArrowPathIcon className="w-48 h-48 text-gray-500 dark:text-gray-400 animate-spin" />
            </div>
            :
            <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
              <div className="container mx-auto py-8">
                <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                  <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Edit Profile</div>
                  <form onSubmit={handleSubmit}>
                    <div className="py-4 px-8">
                      <div className="grid place-items-center">
                        <img className="w-24 h-24 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover mb-3" src={form.photo == '' || form.photo == undefined ? "/no-image.jpg" : form.photo} alt="avatar" />
                        <label htmlFor="file-upload"
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md text-xs mb-7 cursor-pointer">upload photo</label>
                        <input type="file" id="file-upload" className="hidden" onChange={imgChange} />
                      </div>
                      <div className="flex mb-4">
                        <div className="w-1/2 mr-1">
                          <label className="block text-grey-darker text-sm mb-2">username</label>
                          <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            type="text" placeholder="ex: gambol"
                            name='username'
                            value={form.username}
                            onChange={inputChange}
                            disabled={filled}
                            required />
                        </div>
                        <div className="w-1/2 ml-1">
                          <label className="block text-grey-darker text-sm mb-2">artist name</label>
                          <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            type="text" placeholder="Gambol NFT"
                            name='name'
                            value={form.name}
                            onChange={inputChange}
                            required />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-grey-darker text-sm mb-2">about you</label>
                        <textarea className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" placeholder="describe about you"
                          name='about'
                          value={form.about}
                          onChange={inputChange} />
                      </div>
                      <div className="grid justify-items-end mt-8 mb-5">
                        <button className="bg-cyan-500 hover:bg-blue-dark text-white py-2 px-4 rounded-md text-sm" type='submit'
                          disabled={submit}>
                          {submit ? "loading.." : "save"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          }
        </>
      ) : (
        <div className="inline-flex items-center justify-center w-full">
          <h1 className="py-24 mt-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
            Connect wallet to edit profile
          </h1>
        </div>
      )}
    </>
  )
}
