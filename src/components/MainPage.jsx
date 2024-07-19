"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import ArrowIcon from '../../public/arrow.svg'
import ali from '../../public/menu1.png'
import { Button, Checkbox, cn, Textarea } from '@nextui-org/react';

function MainPage(props) {
    const [isLogged, setIsLogged] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const [q3, setQ3] = useState('');
    const [q4, setQ4] = useState('');
    const [q5, setQ5] = useState('');
    const [q1val, setQ1val] = useState(0);
    const [q2val, setQ2val] = useState(0);
    const [q3val, setQ3val] = useState(0);
    const [q4val, setQ4val] = useState(0);
    const [q5val, setQ5val] = useState(0);
    const [recipe, setRecipe] = useState([]);
    const [reciipe, setReciipe] = useState([]);
    const [recipetext, setRecipetext] = useState(''); // 새로운 상태 추가


    useEffect(() => {
        if(q1 === '매우 부족'){
            setQ1val(5);
        } else if(q1 === '부족'){
            setQ1val(4);
        } else if(q1 === '적당'){
            setQ1val(3);
        } else if(q1 === '많음'){
            setQ1val(2);
        } else if(q1 === '매우 많음'){
            setQ1val(1);
        }
        if(q2 === '매우 부족'){
            setQ2val(5);
        }
        else if(q2 === '부족'){
            setQ2val(4);
        }
        else if(q2 === '적당'){
            setQ2val(3);
        }
        else if(q2 === '많음'){
            setQ2val(2);
        }
        else if(q2 === '매우 많음'){
            setQ2val(1);
        }
        if(q3 === '매우 부족'){
            setQ3val(5);
        }
        else if(q3 === '부족'){
            setQ3val(4);
        }
        else if(q3 === '적당'){
            setQ3val(3);
        }
        else if(q3 === '많음'){
            setQ3val(2);
        }
        else if(q3 === '매우 많음'){
            setQ3val(1);
        }
        if(q4 === '매우 부족'){
            setQ4val(5);
        }
        else if(q4 === '부족'){
            setQ4val(4);
        }
        else if(q4 === '적당'){
            setQ4val(3);
        }
        else if(q4 === '많음'){
            setQ4val(2);
        }
        else if(q4 === '매우 많음'){
            setQ4val(1);

        }
        if(q5 === '매우 부족'){
            setQ5val(5);
        }
        else if(q5 === '부족'){
            setQ5val(4);
        }
        else if(q5 === '적당'){
            setQ5val(3);
        }
        else if(q5 === '많음'){
            setQ5val(2);
        }
        else if(q5 === '매우 많음'){
            setQ5val(1);
        }

    }, [q1, q2, q3, q4, q5]);

    const q1Change = (value) => {
        if(q1 === value){
            setQ1('');
        } else{
            setQ1(value);
        }
    };

    const q2Change = (value) => {
        if(q2 === value){
            setQ2('');
        } else{
            setQ2(value);
        }
    };

    const q3Change = (value) => {
        if(q3 === value){
            setQ3('');
        } else{
            setQ3(value);
        }
    };

    const q4Change = (value) => {
        if(q4 === value){
            setQ4('');
        } else{
            setQ4(value);
        }
    };
    
    const q5Change = (value) => {
        if(q5 === value){
            setQ5('');
        } else{
            setQ5(value);
        }
    };

    useEffect(() => {
        const login = window.sessionStorage.getItem('isLogged');
        if (!login || login === 'false') {
            window.location.href = '/login';
        } else{
            setIsLogged(true);
            if(window.sessionStorage.getItem('servingSize') == "null"){
                setPageNumber(2); // 2
            }else{
                setPageNumber(1);
            }
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
        if (pageNumber === 1){
            const response1 = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/recipe', {
                method: 'GET',
            });

            if(response1.status !== 200) {
                alert('레시피를 불러오는데 실패했습니다.');
                return;
            } else{
                const data = await response1.json();
                console.log(data.response);
                setRecipe(data.response);
            }
            const response3 = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/member/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"name": window.sessionStorage.getItem('name'), "email" : window.sessionStorage.getItem('email')})
            });

            if(response3.status !== 200) {
                alert('로그인에 실패했습니다.');
            } else{
                const data = await response3.json();
                console.log(data.response);
                window.sessionStorage.setItem('isLogged', true);
                window.sessionStorage.setItem('name', data.response.name);
                window.sessionStorage.setItem('email', data.response.email);
                window.sessionStorage.setItem('id', data.response.id);
                window.sessionStorage.setItem('servingSize', data.response.servingSize);
            }
        }
        }
        fetchData();
    }, [pageNumber]);

    const renderPage = () => {
        console.log(pageNumber);
        switch (pageNumber) {
          case 1:
            return (
            <>
                <div className='flex w-5/6 text-[#999999] text-opacity-50 text-xs pb-2'>밥 한 공기가 1인분이라고 가정할 때,</div>
                <div className='flex w-5/6 justify-center items-end border-2 border-[#F7941D] rounded-md text-[#F7941D] text-sm font-medium py-3'>
                    당신의 혼밥 양은&nbsp;<span className='text-3xl leading-none'>{parseFloat(window.sessionStorage.getItem('servingSize')).toFixed(2)}</span>&nbsp;공기 입니다
                </div>
                <div><Image src={ArrowIcon} width={25} className='mt-4 mb-10'/></div>
                <div className='flex justify-center items-center text-[#F7941D] text-4xl font-medium'>레시피 보기</div>
                <div className='flex w-full'>
                    <div className='p-3 grid gap-4 grid-cols-3 overflow-y-auto w-full h-72 mx-1 bg-[#F6F6F6]'>
                        {recipe.map((item) => (
                        <div key={item.id} className='flex flex-col justify-center items-center' onClick={async e=>{
                            const response = await fetch(`http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/recipe/${item.id}?memberId=${window.sessionStorage.getItem('id')}`, {
                                method: 'GET',
                            });
                            if(response.status !== 200) {
                                alert('레시피를 불러오는데 실패했습니다.');
                                return;
                            } else{
                                const data = await response.json();
                                console.log(data.response);
                                setReciipe(data.response);
                                setRecipetext(data.response.recipe.recipe.replace(/\n/g, '<br>'));
                                setPageNumber(3);
                            }
                        }}>
                            <Image src={item.imageS3Path} width={80} height={80} />
                            <div className='text-[#6C6969] text-xs pt-1 text-opacity-50'>{item.name}</div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className='flex w-full justify-end mt-5'>
                    <Button radius="sm" size="sm" className='text-white bg-[#F7941D] mr-2 '>레시피 추가</Button>
                </div>
            </>);
          case 2:
            return (
                <div class="flex flex-col justify-center items-center w-full h-full">
                  <div className='flex h-[1200px]'></div>  
                <div className='flex w-5/6 justify-center items-end text-[#F7941D] text-3xl'>
                    당신의 1인분
                </div>
                <div className='flex w-5/6 justify-center items-start text-[#F7941D] text-lg'>
                    알고 계신가요 ?</div>
                <div className='flex'><Image src={ArrowIcon} width={25} className='mt-4 mb-10'/></div>
                <div className='flex justify-center items-center text-[#F7941D] text-4xl font-medium'>알아보기</div>
                <div className='flex w-full mt-12 justify-center items-center'>
                   <div className='flex flex-col w-full px-2'>
                        <div className='flex mb-5 flex-col w-full p-3 border-1 items-start justify-center h-56 text-[#A1A1A1] border-[#A1A1A1]'>
                            <div className='flex w-full justify-start text-xs'>1. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;밥 한 공기를 다 먹을 자신이 있으신가요?</div>
                            <div className='flex flex-col w-full px-3 pt-5'>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4 py-4'),
                                    label: "text-[#A1A1A1] text-xs py-0"
                                }}
                                isSelected={q1 === '매우 부족'}
                                onChange={() => q1Change('매우 부족')}
                                >두 공기는 기본이죠</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q1 === '부족'}
                                onChange={() => q1Change('부족')}
                                >조~~금 더 먹고 싶어요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q1 === '적당'}
                                onChange={() => q1Change('적당')}
                                >적당해요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q1 === '많음'}
                                onChange={() => q1Change('많음')}
                                >배가 불러서 다는 무리예요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q1 === '매우 많음'}
                                onChange={() => q1Change('매우 많음')}
                                >다 먹으면 배가 터질 것 같아요</Checkbox>
                            </div>
                        </div>
                        <div className='flex mb-5 flex-col w-full p-3 border-1 items-start justify-center h-56 text-[#A1A1A1] border-[#A1A1A1]'>
                            <div className='flex w-full justify-start text-xs'>2. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;라면 한 그릇을 다 드실 수 있으신가요?</div>
                            <div className='flex flex-col w-full px-3 pt-5'>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q2 === '매우 부족'}
                                onChange={() => q2Change('매우 부족')}
                                >두 그릇도 껌이죠</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q2 === '부족'}
                                onChange={() => q2Change('부족')}
                                >괜찮은데 추가로 좀 더 먹고 싶어요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q2 === '적당'}
                                onChange={() => q2Change('적당')}
                                >딱 적당한 양이에요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q2 === '많음'}
                                onChange={() => q2Change('많음')}
                                >한 두 젓가락 남아요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q2 === '매우 많음'}
                                onChange={() => q2Change('매우 많음')}
                                >다는 배가 터질 것 같아요</Checkbox>
                            </div>
                        </div>
                        <div className='flex mb-5 flex-col w-full p-3 border-1 items-start justify-center h-56 text-[#A1A1A1] border-[#A1A1A1]'>
                            <div className='flex w-full justify-start text-xs'>1. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L사이즈 피자 3조각이면 배부르신가요?</div>
                            <div className='flex flex-col w-full px-3 pt-5'>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q3 === '매우 부족'}
                                onChange={() => q3Change('매우 부족')}
                                >손가락까지 핥고 싶어요! 다섯 조각은 기본이죠</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q3 === '부족'}
                                onChange={() => q3Change('부족')}
                                >조금 더 먹고 싶어요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q3 === '적당'}
                                onChange={() => q3Change('적당')}
                                >딱 적당해요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q3 === '많음'}
                                onChange={() => q3Change('많음')}
                                >배가 너무 불러요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q3 === '매우 많음'}
                                onChange={() => q3Change('매우 많음')}
                                >너무 많아서 2조각이 최대예요</Checkbox>
                            </div>
                        </div>
                        <div className='flex mb-5 flex-col w-full p-3 border-1 items-start justify-center h-56 text-[#A1A1A1] border-[#A1A1A1]'>
                            <div className='flex w-full justify-start text-xs'>1. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;햄버거 세트 한 세트로 만족하실 수 있나요?</div>
                            <div className='flex flex-col w-full px-3 pt-5'>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q4 === '매우 부족'}
                                onChange={() => q4Change('매우 부족')}
                                >너무 부족해요, 햄최셋은 기본이죠</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q4 === '부족'}
                                onChange={() => q4Change('부족')}
                                >조금 부족해서 사이드 하나는 추가로 먹어야 돼요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q4 === '적당'}
                                onChange={() => q4Change('적당')}
                                >딱 만족스러워요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q4 === '많음'}
                                onChange={() => q4Change('많음')}
                                >사이드까지는 많아요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q4 === '매우 많음'}
                                onChange={() => q4Change('매우 많음')}
                                >함버거 하나는 너무 부담스러워요</Checkbox>
                            </div>
                        </div>
                        <div className='flex mb-5 flex-col w-full p-3 border-1 items-start justify-center h-56 text-[#A1A1A1] border-[#A1A1A1]'>
                            <div className='flex w-full justify-start text-xs'>1. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;김밥 한 줄이 딱 맞나요?</div>
                            <div className='flex flex-col w-full px-3 pt-5'>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q5 === '매우 부족'}
                                onChange={() => q5Change('매우 부족')}
                                >아니 김밥은 기본 두 줄이죠</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q5 === '부족'}
                                onChange={() => q5Change('부족')}
                                >매번 세 개만 딱 더 있으면 만족스럽겠어요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q5 === '적당'}
                                onChange={() => q5Change('적당')}
                                >딱 적당해요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q5 === '많음'}
                                onChange={() => q5Change('많음')}
                                >한 두개는 남아요</Checkbox>
                                <Checkbox size="sm" color="warning" radius="none"
                                classNames={{
                                    base: cn('text-[#A1A1A1] px-0 py-4'),
                                    label: "text-[#A1A1A1] text-xs"
                                }}
                                isSelected={q5 === '매우 많음'}
                                onChange={() => q5Change('매우 많음')}
                                >배불러서 내일 아침까지 먹어야겠어요</Checkbox>
                            </div>
                        </div>
                   </div>
                </div>
                <div className='flex w-full mt-24 mb-28 justify-center'>
                    <Button radius="sm" size="sm" className='w-5/6 text-white bg-[#F7941D] ' onPress={async e=>{
                        if(!q1val || !q2val || !q3val || !q4val || !q5val) {
                            alert('모든 질문에 답해주세요');
                            return;
                        } else{
                            const response = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/member/survey', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"memberId": window.sessionStorage.getItem('id'), "score": [q1val,q2val,q3val,q4val,q5val]})
                            });
                            if(response.status !== 200) {
                                alert('1인분 계산을 저장하는데 실패했습니다.');
                                return;
                            } else{
                                const data = await response.json();
                                console.log(data)
                                window.sessionStorage.setItem('servingSize', data.response);
                                setPageNumber(1);
                            }
                        }
                    }}>나의 1인분 계산하기</Button>
                </div>
                </div>);
          case 3:
            return (
                <div class="flex flex-col justify-center items-center w-full h-full">
                  <div className='flex h-[400px]'></div>  
                <div className='flex w-5/6 justify-center items-center text-center text-[#F7941D] text-4xl'>
                    혼밥용<br/>맞춤 레시피
                </div>
                <div className='flex w-full px-10 mb-9 '>
                <div className='flex flex-row justify-between w-full pt-14'>
                    <div className='flex flex-col'>
                        <Image src={reciipe.recipe.imageS3Path} width={130} height={130} />
                        <div className='flex w-full justify-center items-center pt-2 text-center text-[#F7941D]'>{reciipe.recipe.name}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center border-1 border-black border-opacity-70 bg-[#F6F6F6] w-44 '>
                        <div className='flex w-4/6 text-xs text-center justify-center mb-3 border-b-1 border-[#4A5667]'>재료</div>
                        <div className='flex w-4/6 text-xs text-center justify-start'>
                            <ul className='text-left h-28 w-full overflow-y-auto'>
                                {reciipe.ingredients.map((item, index) => (
                                    <li key={index} className='pb-1'>{item.name}: {item.amount == 0 ? "" : item.amount}{item.unit}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
                <div className='flex w-full'>
                    <div className='flex flex-col justify-center mx-1 h-72 w-full bg-[#f6f6f6]'>
                        <div className='flex w-full pt-2 justify-center items-center text-center '>
                            <div className='flex w-1/3 justify-center text-center border-b-1 border-[#4A5667]'>레시피</div>
                        </div>
                        <div className='flex w-full px-2 mt-2 overflow-y-auto h-64' dangerouslySetInnerHTML={{ __html: recipetext }} ></div>
                    </div>
                </div>
                <div className='pt-4 text-2xl text-[#F7371D]'> 절감한 탄소 배출량</div>
                <div><Image src={ArrowIcon} width={25} className='mt-4 mb-6'/></div>
                <div className='flex w-full justify-center text-center text-[#F7371D]'>{reciipe.reducedCo2.toFixed(1)} kgCO2e <span className='text-[#F7941D]'> &nbsp;온실가스 배출을 줄였습니다</span></div>
                <div className='flex w-full justify-center text-center text-[#F7371D] pt-1'>소나무 {(0.15*reciipe.reducedCo2).toFixed(1)}그루 <span className='text-[#F7941D]'> &nbsp;를 살렸습니다</span></div>
                <div className='flex w-full mt-7 mb-16 justify-center'>
                    <Button radius="sm" size="sm" className='w-5/6 text-white bg-[#F7941D] '
                    onPress={e=>{
                        setPageNumber(4);
                    }}
                    >요리가 끝났다면 평가 GO</Button>
                </div>
                </div>);
          case 4:
            return (
                <div class="flex flex-col justify-center items-center w-full h-full">
                  <div className='flex h-[350px]'></div>  
                <div className='flex w-5/6 justify-center items-center text-center text-[#F7941D] text-4xl'>
                    평가하기
                </div>
                <div className='flex w-full px-10 mb-9 '>
                <div className='flex flex-col justify-between w-full pt-20'>
                    <div className='flex text-xl text-[#999999] pb-3'>
                        음식의 양이...
                    </div>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <Button radius="sm" size="sm" className='bg-[#F6F6F6] h-14' onPress={async e=>{
                            const response = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/member/feedback', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"memberId": window.sessionStorage.getItem('id'), "feedback" : false})
                            });
                            if(response.status !== 200) {
                                alert('평가를 저장하는데 실패했습니다.');
                                return;
                            } else{
                            }

                            const response2 = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/member/finish', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"memberId": window.sessionStorage.getItem('id'), "carbonPledge" : reciipe.reducedCo2})
                            });
                            if(response2.status !== 200) {
                                alert('평가를 저장하는데 실패했습니다.');
                                return;
                            } else{
                            }
                        }}>부족했어요</Button>    
                        <Button radius="sm" size="sm" className='bg-[#F6F6F6] h-14' onPress={async e=>{
                            const response = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/member/feedback', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"memberId": window.sessionStorage.getItem('id'), "feedback" : null})
                            });
                            if(response.status !== 200) {
                                alert('평가를 저장하는데 실패했습니다.');
                                return;
                            } else{
                            }

                            const response2 = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/member/finish', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"memberId": window.sessionStorage.getItem('id'), "carbonPledge" : reciipe.reducedCo2})
                            });
                            if(response2.status !== 200) {
                                alert('평가를 저장하는데 실패했습니다.');
                                return;
                            } else{
                            }
                        }}>딱 좋아요</Button>    
                        <Button radius="sm" size="sm" className='bg-[#F6F6F6] h-14' onPress={async e=>{
                            const response = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/member/feedback', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"memberId": window.sessionStorage.getItem('id'), "feedback" : true})
                            });
                            if(response.status !== 200) {
                                alert('평가를 저장하는데 실패했습니다.');
                                return;
                            } else{
                            }

                            const response2 = await fetch('http://ec2-3-19-39-78.us-east-2.compute.amazonaws.com:8080/api/v1/member/finish', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"memberId": window.sessionStorage.getItem('id'), "carbonPledge" : reciipe.reducedCo2})
                            });
                            if(response2.status !== 200) {
                                alert('평가를 저장하는데 실패했습니다.');
                                return;
                            } else{
                            }
                        }}>많았어요</Button>    
                    </div>
                </div>
                </div>
                <div className='flex w-full pt-12'>
                    <div className='flex flex-col justify-center mx-1 h-72 w-full bg-[#f6f6f6]'>
                        <div className='flex w-full pt-2 justify-center items-center text-center '>
                            <div className='flex w-1/3 justify-center text-center border-b-1 border-[#4A5667]'>피드백 남기기</div>
                        </div>
                        <div className='flex border-1 border-black h-56 mt-2'>
                            <Textarea
                            classNames={{
                                innerWrapper: cn('h-52 text-[#1234567]'),
                            }}
                            ></Textarea>
                        </div>
                    </div>
                </div>
                <div className='flex w-full mt-7 mb-16 justify-end'>
                    <Button radius="sm" size="sm" className=' mr-2 text-white bg-[#F7941D] '
                    onPress={e=>{alert('피드백을 남겼습니다.'); setPageNumber(1);}}
                    >전송하기</Button>
                </div>
                </div>);
          default:
            return (
                <>
                    <div>asdf</div>
                </>);
        }
      };
    


    return (
        <>
            {renderPage()}
        </>
    );
}

export default MainPage;