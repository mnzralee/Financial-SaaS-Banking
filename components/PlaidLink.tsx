import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { StyledString } from 'next/dist/build/swc/types';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();

    const [token, setToken] = useState('');
    
    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => { // 1. Define a callback function to handle the onSuccess event.
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })

        router.push('/');
    }, [user]) 
  
    const config: PlaidLinkOptions = { // 2. Define the PlaidLink configuration object.
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config) // 3. Use the usePlaidLink hook to create a link token and open the Plaid Link modal.  
  
    return (
    <>
        {variant === 'primary' ? (
            <Button 
                onClick={() => open()}
                className='plaidlink-primary'
                disabled={!ready}
            >
                Connect Bank
            </Button>
        ): variant === 'ghost' ? (
            <Button>
                Connect Bank
            </Button>
        ): (
            <Button>
                Connect Bank
            </Button>
        )}
    </>
  )
}

export default PlaidLink