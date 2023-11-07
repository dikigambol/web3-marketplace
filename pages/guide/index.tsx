
export default function Guide (){

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-gray-900 text-lg title-font font-bold mb-1 mt-5">Install ETRNL Wallet</h2>
                    <br />
                    <ol className="list-decimal">
                        <li>
                            <p>
                                Visit the official ETRNL site <a href="https://eternl.io/app/mainnet/welcome" target="_blank">https://eternl.io/app/mainnet/welcome</a>
                            </p>
                            <br />
                        </li>
                        <li>
                            <p>
                                Choose Download Browser Extension, i.e. Chrome browser extension from Chrome Web Store. 
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+official+etrnl+site.jpg" alt="guide official etrnl site" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                            <p>
                                Note : Basically, you can directly create wallet at this site. But, the browser extension will make you comfort for Web3 operation.
                            </p>
                            <br />
                        </li>
                        <li>
                            <p>
                                Click Add to Chrome button 
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+chrome+extension.jpg" alt="guide etrnl chrome extension" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                        </li>
                        <li>
                            <p>
                                Click Add extension button 
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+add+extension.jpg" alt="guide add extension" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                            <p>
                                Once the download installe file completed, it will install automatically. And if you see below view, it means the extension installed successfully. 
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+add+extension+success.jpg" alt="guide add extension success" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                            <p>
                                Now, we are good to go. Lets continue to Create/Restore ETRNL Wallet.
                            </p>
                            <br />
                        </li>
                    </ol>
                    <br />
                    <hr />
                    <h2 className="text-gray-900 text-lg title-font font-bold mb-1 mt-5">Create ETRNL Wallet</h2>
                    <br />
                    <ol className="list-decimal">
                        <li>
                            <p>
                                Open the ETRNL Wallet extension and you will see wallet dashboard. We will create fresh new wallet. Lets start with click Add Wallet button at top-left corner.
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+add+wallet.jpg" alt="guide etrnl add wallet" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                            <p>
                                Then will show 4 options like this. Straight forward select Create Wallet button.
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+create+wallet.jpg" alt="guide etrnl create wallet" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                        </li>
                        <li>
                            <p>
                                Next, we need to set Credential for our wallet. See the picture below.
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+wallet+set+credential.jpg" alt="guide etrnl wallet set credential" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                            <p>
                                <strong>Wallet Name</strong> is typically like our username for our wallet. We can use string (both upper case or lower case), number, and space as well. We can specify it with our Name or even our Organization Name.
                            </p>
                            <br />
                            <p>
                                <strong>Password (or Spending Password)</strong> is password as usual we use for credential access to authorization the application. We must use at least 12 chars, at least have 1 or more Upper case, at least 1 or more numeric, at least 1 or more special char such as ! , # , @ , etc. Tips : this field have password strength checker. Once our password is strong, then we are good to go.
                            </p>
                            <br />
                            <p>
                                <strong>Repeat Password</strong> is just confirm our password. Just input our previous password as well.
                            </p>
                            <br />
                            <p>
                                After all fields full filled correctly, the button Save will be enabled. Otherwise, its disabled.
                            </p>
                            <br />
                            <p>
                                <strong>Attention ! Important thing !</strong> we need to take a note this Wallet Name and especially Spending Password. Because every time we doing transaction such as send crypto asset/NFT, we must submit the Spending Password. This is security layer for preventing our asset/NFT is transfered into another wallet without our permission. We can write down it on paper note or digital note like notepad.
                            </p>
                            <br />
                        </li>
                        <li>
                            <p>
                                In this step, we will see option how many account we want in the ETRNL Wallet. This is basic feature of ETRNL wallet, which can hold multiple account up to 24 accounts. In which each account can do unique action, such as transactions or stake delegation. The default value is 1 account. So, for simple step, lets just use the default 1. Or, if you need explore multiple account, just go ahead some number (12 is good too). Then click Save button.
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+number+accounts.jpg" alt="guide etrnl number accounts" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                        </li>
                        <li>
                            <p>
                                This step is just warning and we need to pay attention for the next step. That we will get passphrase for our wallet. Just check that box 'I confirm that nobody can see my screen, because anyone who knows my recovery phrase will be able to spend the funds in my wallet' and then click continue.
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+confirm+save+screen.jpg" alt="guide etrnl confirm save screen" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                        </li>
                        <li>
                            <p>
                                Here we go, now we are in crucial step for our wallet. The ETRNL Wallet generated 24 phrases for us. Its called PASSPHRASE. This is security layer for ensure our wallet is unique and not collide with another peoples wallet. It is difficult for remember all of 24 phrases, so we must write it down to notes (up to you either physical or digital note). Because we will always need this phrases every time we restore or access our wallet in another device. Once you done rewrite it on notes, lets check 'Yes, I wrote it down carefully' and then click Continue button.
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+passphrases.jpg" alt="guide etrnl passphrases" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                            <p>
                                <strong>ATTENTION ! IMPORTANT !</strong> don't lost or forget this passphrases because this as your key for access your wallet and all of asset within. Once you lost or forget, then all your asset is lost permanently. So, please handle and save it carefully. NOT YOU KEY, NOT YOUR ASSET. 
                            </p>
                            <br />
                        </li>
                        <li>
                            <p>
                                And then, we are in the final step. Before we get our wallet dashboard, we must enter all of 24 passphrase. Take a look our note and retype it to confirm in this step. Once we done, check the box 'I understand that the only way to recover my wallet if my computer is lost, broken, stolen or stops working is to use my wallet recovery phrase' and click Continue button.
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+passphrase+confirm.jpg" alt="guide etrnl passphrase confirm" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                        </li>
                        <li>
                            <p>
                                VOILA ! our wallet creation success. We will see dashboard like this.
                            </p>
                            <br />
                            <figure className="object-center">
                                <img src="/guide+etrnl+success.jpg" alt="guide etrnl success" className="h-80 w-160 object-cover object-center" />
                            </figure>
                            <br />
                            <p>
                                Please let me know if you having in trouble with above steps, I will help you. You can reach me at my telegram channel @yodhaanoraga
                            </p>
                            <br />
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}