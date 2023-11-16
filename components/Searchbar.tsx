'use client'
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const hostName = parsedURL.hostname;

    if (
      hostName.includes('amazon.com') || 
      hostName.includes('amazon.') ||
      hostName.includes('amazon')
    )
    {
      return true
    }
  } catch (error) {
    return false
  }

  return false
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValidLink = isValidAmazonProductURL(searchPrompt)

    if(!isValidLink) return alert('Please enter a valid Amazon Product URL')

    try{
      setIsLoading(true)

      //scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt)
    } catch (error){
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form 
        className='flex flex-wrap gap-4 mt-12'
        onSubmit={handleSubmit}
    >
        <input type='text'
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            placeholder='Enter product link'
            className='searchbar-input'
        />
        <button 
            type='submit'
            className='searchbar-btn'
            disabled={searchPrompt === ''}>
            {isLoading ? "Searching..." : "Search"}
        </button>
    </form>

  )
}

export default Searchbar