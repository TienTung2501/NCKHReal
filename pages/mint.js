import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faTwitter, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Mint.module.scss';
import { useWallet } from '@meshsdk/react';
import axios from 'axios';
const cx = classNames.bind(styles);
function Mint() {
    const [file, setFile] = useState([]);
    const [assetType, setAssetType] = useState('');
    const [walletAddress, setWalletAddress] = useState('Minted by: Create Token');
    const [assetName, setAssetName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [numberOfAssets, setNumberOfAssets] = useState('');
    const [metadataList, setMetadataList] = useState([]); // list các trường thông tin được thêm
    const { connected, wallet } = useWallet();
    const [assets, setAssets] = useState();
    const [loading, setLoading] = useState(false);

    async function getAssets() {
        if (wallet) {
        setLoading(true);
        const _assets = await wallet.getAssets();
        setAssets(_assets);
        setLoading(false);
        }
    }
    function handleAddMetadataClick() {
        setMetadataList([...metadataList, { name: '', value: '' }]);
    }

    function handleMetadataNameChange(event, index) {
        const newList = [...metadataList];
        newList[index].name = event.target.value;
        setMetadataList(newList);
    }

    function handleMetadataValueChange(event, index) {
        const newList = [...metadataList];
        newList[index].value = event.target.value;
        setMetadataList(newList);
    }

    function renderMetadataInputs() {
        return metadataList.map((metadata, index) => (
            <div key={index} className={cx('group-input-item')}>
                <span>Metadata {index + 1}</span>
                <input
                    type="text"
                    name={`metadata-name-${index}`}
                    value={metadata.name}
                    onChange={(event) => handleMetadataNameChange(event, index)}
                    placeholder="Name of your metadata"
                />
                <input
                    type="text"
                    name={`metadata-value-${index}`}
                    value={metadata.value}
                    onChange={(event) => handleMetadataValueChange(event, index)}
                    placeholder="Value of your metadata"
                />
            </div>
        ));
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        const images = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function (e) {
                images.push(e.target.result);
                if (images.length === files.length) {
                    setFile(images);
                }
            };

            reader.readAsDataURL(file);
        }
    };
    const handleAssetTypeChange = (event) => {
        setAssetType(event.target.value);
    };

    const handleWalletAddressChange = (event) => {
        setWalletAddress(event.target.value);
    };

    const handleAssetNameChange = (event) => {
        setAssetName(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleNumberOfAssetsChange = (event) => {
        setNumberOfAssets(event.target.value);
    };
    const handleSubmitClick = async (event) => {
        event.preventDefault();
        let formValid = true;

        // Check file is uploaded
        if (file.length === 0) {
            formValid = false;
            alert('Please upload a file');
        }

        // Check asset type is selected
        else if (assetType === '') {
            formValid = false;
            alert('Please select an asset type');
        }

        // Check wallet address is entered
        else if (walletAddress === '') {
            formValid = false;
            alert('Please enter a wallet address');
        }

        // Check asset name is entered and is no more than 32 characters
        else if (assetName === '' || assetName.length > 32) {
            formValid = false;
            alert('Please enter an asset name (maximum 32 characters)');
        }

        // Check author is entered
        else if (author === '') {
            formValid = false;
            alert('Please enter an author name');
        }

        // Check description is entered and is no more than 64 characters
        else if (description === '' || description.length > 64) {
            formValid = false;
            alert('Please enter a description (maximum 64 characters)');
        }

        // Check number of assets is entered and is between 1 and 8
        else if (assetType === 'token') {
            if (numberOfAssets === '' &&( numberOfAssets < 1 || numberOfAssets > 8) )formValid = false;
            alert('Please enter a number of assets between 1 and 8');
        }

        // If all form inputs are valid, submit the form
        if (formValid) {
            //call API
            const NFT = {
                file,
                assetType,
                walletAddress,
                assetName,
                author,
                description,
                numberOfAssets,
                metadataList,
            };
            // Post data lên API endpoint trong Next.js
            try {
                const response = await axios.post('/api/submitData', NFT);
                console.log(response.data.message);
                // Further actions or success message
              } catch (error) {
                console.error('Error saving data:', error);
                // Error handling
              }
              console.log(NFT)
        }
    };

    return (
      <div className={cx('container')}>




            <div className={cx('container-header')}>
                <div className={cx('header')}>
                    <div className={cx('header-content')}>
                        <h2>Mint you assets Here!</h2>
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            /
                            <li>
                                <Link href="/Mint">Mint Page</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('left-content')}>
                    <div className={cx('wrapper')}>
                        <div className={cx('background-left')}>
                            <Image src='/images/Mintbackground2.jpg' alt="Background" width={200} height={200}/>
                            <div className={cx('author-background')}>
                            <Image src='/images/luffy.png' alt="author" width={40} height={60}/>
                            </div>
                        </div>
                        <div className={cx('about-author')}>
                            <span>Morgan Wright</span>
                            <h3>Creative NFTs Designer</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos distinctio labore.</p>
                        </div>
                        <div className={cx('contact')}>
                            <ul>
                                <li>
                                    <a href="https://github.com/frozenproof/nckh2_real_2.0">
                                        <FontAwesomeIcon icon={faSquareFacebook} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/frozenproof/nckh2_real_2.0">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/frozenproof/nckh2_real_2.0">
                                        <FontAwesomeIcon icon={faGoogle} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/frozenproof/nckh2_real_2.0">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('container-mint')}>
                        <div className={cx('wrapper')}>
                            <form action="">
                                <h1>Mint your assets</h1>
                                {/* input file */}
                                <div className={cx('group-input-file')}>
                                    <span>PDF, PNG, GIF, WEBP, MP4 or MP3. Max 100mb</span>
                                    <label className={cx('btn-input')} htmlFor="file">
                                        UPLOAD FILE
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        id="file"
                                        name="file"
                                        onChange={handleFileChange}
                                        pattern="^0x[a-fA-F0-9]{40}$"
                                        required
                                    />
                                </div>
                                {/* Type of assets */}
                                <div className={cx('group-input-item-checkbox')}>
                                    <span>Type of asset:</span>
                                    <input
                                        type="radio"
                                        id="nft"
                                        name="assetType"
                                        value="NFT"
                                        onChange={handleAssetTypeChange}
                                    />
                                    NFT
                                    <input
                                        type="radio"
                                        id="token"
                                        name="assetType"
                                        value="Token"
                                        onChange={handleAssetTypeChange}
                                    />
                                    Token
                                </div>
                                {/* PolicyID */}
                                <div className={cx('group-input-item')}>
                                    <input
                                        type="text"
                                        id="walletAddress"
                                        name="walletAddress"
                                        value={walletAddress}
                                        onChange={handleWalletAddressChange}
                                        placeholder="Address your wallet"
                                    />
                                </div>
                                {/* name */}
                                <div className={cx('group-input-item')}>
                                    <input
                                        type="text"
                                        id="assetName"
                                        name="assetName"
                                        value={assetName}
                                        onChange={handleAssetNameChange}
                                        placeholder="Name of your assset"
                                    />
                                </div>
                                <div className={cx('group-input-item')}>
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        value={author}
                                        onChange={handleAuthorChange}
                                        placeholder="Author"
                                    />
                                </div>
                                {/* description */}
                                <div className={cx('group-input-item')}>
                                    <input
                                        type="textarea"
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        placeholder="Decription of your asset"
                                    />
                                </div>
                                {assetType === 'Token' && (
                                    <div className={cx('group-input-item')}>
                                        <input
                                            type="number"
                                            id="numberOfAssets"
                                            name="numberOfAssets"
                                            onChange={handleNumberOfAssetsChange}
                                            placeholder="Number of your asset"
                                        />
                                    </div>
                                )}
                                <div className={cx('group-input-add-item')}>
                                    <button type="button" onClick={handleAddMetadataClick}>
                                        Add metadata of Token +
                                    </button>
                                </div>
                                {renderMetadataInputs()}

                                {/* <div className={cx('group-input-item')}>
                                    <input
                                        type="number"
                                        id="numberOfAssets"
                                        name="numberOfAssets"
                                        onChange={handleNumberOfAssetsChange}
                                        placeholder="Number of your asset"
                                    />
                                </div> */}
                                <div className={cx('group-input-item-submit')}>
                                    <button type="submit" onClick={handleSubmitClick} className={cx('btn-submit')}>
                                        Mint
                                    </button>
                                </div>
                            </form>

                            <div className={cx('group-display-files')}>
                                {file.map((image, index) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div key={index} className={cx('container-img')}>
                                        <Image  src={image} alt={cx(`Selected Image ${index}`)} width={80} height={50}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Mint;
