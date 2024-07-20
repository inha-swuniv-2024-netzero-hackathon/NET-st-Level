'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import Image from 'next/image';
import EmailIcon from '../../../public/email.svg'
import NameIcon from '../../../public/name.svg'
import Title from '../../../public/title.png'
import { useRouter } from 'next/navigation';

function Page(props) {
    const [name, setName] = useState('');
    const [isName, setIsName] = useState(false);
    const [email, setEmail] = useState('');
    const [isEmail, setIsEmail] = useState(false);
    const router = useRouter();

    return (
        <div className='flex justify-center items-center  absolute w-full h-full'>
          <div id="mobile" className='flex flex-col min-h-screen w-[425px] border-2 border-black items-center justify-center'>
            <div className='flex justify-center items-center w-full h-1/4 text-red-600 text-3xl font-extrabold'>
                <Image src= {Title} className='w-5/6'/>
            </div>
            <div className='flex mt-16 w-5/6'>
                <Input 
                isInvalid={isName}
                errorMessage="이름을 입력해주세요"
                radius="none" 
                variant="bordered" 
                placeholder='이름' 
                value = {name}
                onValueChange={setName}
                startContent = {
                    <Image src={NameIcon} width={25} className='mr-2'/>
                }
                />
            </div>
            <div className='flex mt-4 w-5/6'>
                <Input 
                type="email"
                isInvalid={isEmail}
                errorMessage="이메일을 입력해주세요"
                radius="none" 
                variant="bordered" 
                placeholder='이메일' 
                value = {email}
                onValueChange={setEmail}
                startContent = {
                    <Image src={EmailIcon} width={25} className='mr-2'/>
                }
                />
            </div>
            <div className='flex w-full items-center justify-center'>
                <Button onPress={async e=>{
                    if(!name || !email) {
                        if(!name) {
                            setIsName(true);
                        }
                        if(!email) {
                            setIsEmail(true);
                        }
                        return;
                    } else{
                        setIsName(false);
                        setIsEmail(false);
                        const response = await fetch('/api/v1/member/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({"name": name, "email" : email})
                        });

                        if(response.status !== 200) {
                            alert('로그인에 실패했습니다.');
                        } else{
                            const data = await response.json();
                            console.log(data.response);
                            if(typeof window !== 'undefined') {
                                const ss = window.sessionStorage;
                                ss.setItem('isLogged', true);
                                ss.setItem('data', JSON.stringify(data.response));
                            router.push('/');
                            }
                        }
                    }
                }} className='mt-4 bg-[#4A5667] text-white font-bold w-5/6'>로그인</Button>
            </div>
          </div>
        </div>
    );
}

export default Page;