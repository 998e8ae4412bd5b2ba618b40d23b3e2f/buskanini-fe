import Header from "@/app/components/header";
import React from "react";
import Patreon from "../../../../public/svg/socialMediaContacts/Patreon.svg";
import Behance from "../../../../public/svg/socialMediaContacts/behance.svg";
import Facebook from "../../../../public/svg/socialMediaContacts/facebook.svg";
import Instagram from "../../../../public/svg/socialMediaContacts/instagram.svg";
import Telegram from "../../../../public/svg/socialMediaContacts/telegram.svg";
import { ContactForm } from "./components";
import styles from "./contacts.module.scss";

const Page = () => {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.questionForm}>
					<div className={styles.haveQuestionSide}>
						<h1>
							<span>Маєте запитання?</span> <br /> Напишіть нам!
						</h1>

						<div className={styles.socMedias}>
							<svg
								width="142"
								height="38"
								viewBox="0 0 142 38"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7.28005 0.130942C4.3849 1.25881 1.20218 4.44518 0.196965 8.44477C-1.07605 13.5124 4.22157 15.6553 4.65609 14.9527C5.16751 14.1271 3.70682 13.8479 3.40614 11.2186C3.01755 7.82258 4.71392 4.02794 6.84886 2.36296C7.24571 2.05363 7.22683 2.48417 7.22683 3.28055C7.22683 4.70465 7.14228 17.489 7.14228 20.1571C7.14228 23.7673 6.98206 24.9074 6.6943 26.0339C6.40274 27.1755 5.934 27.9469 6.28918 28.244C6.68601 28.5764 8.38033 27.7858 9.3612 26.5117C10.5374 24.9836 10.9491 23.1485 11.023 21.1556C11.1123 18.7532 11.1085 14.941 11.1123 12.7666C11.1159 10.7724 11.1484 4.93274 11.0748 1.42217C11.0567 0.561103 8.49081 -0.342287 7.27991 0.129895M110.087 17.0267C109.993 18.9036 109.547 20.3707 108.993 21.4054C107.92 23.4087 105.695 24.0308 104.75 21.151C104.235 19.5812 104.211 16.9595 104.581 14.7689C104.958 12.5373 106.01 10.852 107.753 11.004C109.471 11.1542 110.276 13.2155 110.087 17.0267ZM81.1114 28.6714C81.0881 31.79 80.5607 34.5243 79.4298 35.3185C77.8258 36.4446 75.6699 35.5999 76.1163 33.3242C76.5113 31.3105 78.3793 29.254 81.1159 26.7412C81.1159 26.7412 81.1216 27.3142 81.1114 28.6714ZM80.6733 17.0086C80.5752 18.718 80.099 20.4354 79.5795 21.4057C78.5072 23.409 76.2654 24.0352 75.3363 21.1512C74.7011 19.1807 74.8533 16.6304 75.1676 15.0235C75.5754 12.9386 76.5639 11.0044 78.3393 11.0044C80.0655 11.0044 80.9166 12.7668 80.6733 17.0086ZM63.888 16.9824C63.7827 18.7929 63.4032 20.3064 62.7942 21.4057C61.6923 23.3952 59.5124 24.0261 58.551 21.1512C57.858 19.0782 58.0939 16.2515 58.3822 14.7246C58.8101 12.4587 59.8814 10.8522 61.554 11.0044C63.272 11.1606 64.1072 13.2155 63.888 16.9824ZM140.811 19.0972C140.391 19.0972 140.2 19.5001 140.041 20.1783C139.491 22.5364 138.913 23.0688 138.168 23.0688C137.335 23.0688 136.586 21.9012 136.394 19.5638C136.243 17.7259 136.267 14.3422 136.461 10.9763C136.5 10.2847 136.295 9.6005 134.302 8.92666C133.444 8.63682 132.198 8.21005 131.577 9.60449C129.823 13.544 129.137 16.6717 128.976 17.9423C128.967 18.008 128.881 18.0214 128.866 17.8678C128.763 16.8502 128.533 15.0009 128.504 11.1157C128.499 10.3576 128.326 9.7124 127.427 9.18413C126.844 8.84135 125.072 8.2351 124.435 8.95635C123.882 9.54621 123.242 11.1336 122.577 13.0153C122.037 14.5447 121.66 15.5793 121.66 15.5793C121.66 15.5793 121.667 11.4527 121.674 9.88744C121.677 9.29693 121.241 9.10016 121.11 9.06449C120.519 8.90493 119.356 8.63838 118.862 8.63838C118.252 8.63838 118.103 8.95546 118.103 9.41747C118.103 9.47796 118.007 14.8505 118.007 18.6072C118.007 18.7704 118.007 18.9484 118.008 19.1376C117.671 20.8642 116.578 23.2081 115.389 23.2081C114.199 23.2081 113.637 22.2282 113.637 17.7496C113.637 15.1369 113.721 14.0008 113.763 12.1111C113.787 11.0227 113.833 10.1869 113.831 9.99722C113.822 9.41556 112.741 9.1224 112.238 9.01406C111.733 8.9048 111.294 8.86248 110.951 8.88065C110.466 8.90613 110.123 9.2024 110.123 9.60989C110.123 9.82837 110.125 10.2438 110.125 10.2438C109.5 9.32981 108.495 8.69363 107.826 8.50928C106.025 8.01139 104.145 8.45255 102.727 10.299C101.601 11.7661 100.921 13.4278 100.654 15.8151C100.458 17.5605 100.522 19.3303 100.87 20.8271C100.45 22.5161 99.6707 23.2081 98.8174 23.2081C97.5786 23.2081 96.6805 21.3262 96.7848 18.0717C96.8536 15.9311 97.3139 14.4289 97.8169 12.2556C98.0314 11.3292 97.8572 10.8441 97.42 10.3792C97.0191 9.9529 96.1648 9.73509 94.9368 10.003C94.0621 10.194 92.8114 10.3994 91.6671 10.5572C91.6671 10.5572 91.7362 10.3008 91.7929 9.84877C92.0905 7.47825 89.3227 7.67059 88.4397 8.42773C87.9125 8.87977 87.5537 9.4129 87.4175 10.3715C87.2016 11.8927 88.5346 12.6101 88.5346 12.6101C88.0973 14.4734 87.0252 16.9075 85.9183 18.6674C85.3255 19.6102 84.8719 20.3089 84.2865 21.0516C84.2843 20.775 84.2827 20.4985 84.2816 20.2233C84.2682 16.3059 84.3243 13.2228 84.349 12.1115C84.3731 11.0231 84.42 10.2094 84.4173 10.0198C84.4107 9.59432 84.1438 9.43366 83.5886 9.23024C83.0976 9.05033 82.5172 8.92579 81.9151 8.88236C81.1551 8.82719 80.6972 9.20234 80.7091 9.64594C80.7115 9.7297 80.7115 10.244 80.7115 10.244C80.0865 9.32996 79.0813 8.6938 78.4125 8.50943C76.6111 8.01175 74.7314 8.45293 73.3136 10.2992C72.187 11.7663 71.4492 13.825 71.2401 15.7971C71.0454 17.6351 71.0813 19.1971 71.3468 20.5129C71.0604 21.8304 70.2368 23.2082 69.3057 23.2082C68.1152 23.2082 67.4379 22.2283 67.4379 17.7497C67.4379 15.137 67.5222 14.001 67.5636 12.1115C67.5876 11.0231 67.6341 10.1871 67.6315 9.9976C67.6227 9.41595 66.542 9.12278 66.0391 9.01421C65.513 8.90098 65.0587 8.85932 64.7099 8.88324C64.2497 8.91516 63.9261 9.29873 63.9261 9.58479V10.244C63.3011 9.32996 62.2959 8.6938 61.6271 8.50943C59.8258 8.01175 57.9566 8.46003 56.5283 10.2992C55.5969 11.4984 54.8429 12.8279 54.4548 15.771C54.3427 16.6215 54.2931 17.4179 54.2996 18.1623C53.9281 20.2763 52.2877 22.7128 50.9459 22.7128C50.1607 22.7128 49.4128 21.2953 49.4128 18.2744C49.4128 14.2505 49.6804 8.52118 49.7257 7.969C49.7257 7.969 51.4211 7.94219 51.7494 7.93863C52.5951 7.92999 53.361 7.9486 54.4874 7.89498C55.0524 7.86817 55.5967 5.98116 55.0136 5.74762C54.7493 5.64192 52.8815 5.5493 52.1411 5.53467C51.5185 5.52154 49.7852 5.40216 49.7852 5.40216C49.7852 5.40216 49.9407 1.59933 49.9769 1.19761C50.0076 0.862792 49.5421 0.690406 49.2752 0.585803C48.6262 0.330323 48.0455 0.208001 47.3572 0.0759396C46.4063 -0.106637 45.9749 0.0719507 45.8906 0.818911C45.7637 1.95255 45.698 5.27298 45.698 5.27298C45.0001 5.27298 42.6164 5.14602 41.9184 5.14602C41.2698 5.14602 40.5698 7.74188 41.4665 7.77377C42.4981 7.81101 44.2959 7.84314 45.4877 7.8766C45.4877 7.8766 45.4347 13.7003 45.4347 15.4982C45.4347 15.6895 45.4364 15.8737 45.4368 16.0524C44.7809 19.2344 42.4705 20.9532 42.4705 20.9532C42.9666 18.8482 41.9531 17.2674 40.1275 15.9292C39.4549 15.4361 38.1271 14.5026 36.6414 13.4796C36.6414 13.4796 37.5019 12.6903 38.2649 11.1025C38.8056 9.9777 38.8289 8.69051 37.5018 8.40667C35.3091 7.93735 33.501 9.43614 32.9618 11.0362C32.5439 12.2757 32.7668 13.1955 33.5853 14.151C33.6451 14.2208 33.7098 14.2922 33.7767 14.364C33.2818 15.2519 32.6018 16.4473 32.0259 17.3744C30.4273 19.9483 29.2198 21.9842 28.3072 21.9842C27.5777 21.9842 27.5874 19.9172 27.5874 17.982C27.5874 16.3136 27.7198 13.8053 27.8255 11.2084C27.8605 10.3495 27.3991 9.86025 26.6256 9.41709C26.1556 9.14787 25.1525 8.6185 24.5716 8.6185C23.7021 8.6185 21.1934 8.72862 18.823 15.11C18.5243 15.9144 17.9374 17.3799 17.9374 17.3799L17.9879 9.70603C17.9879 9.52611 17.885 9.35217 17.6492 9.23317C17.2498 9.03131 16.1829 8.6185 15.2343 8.6185C14.7823 8.6185 14.5568 8.81416 14.5568 9.20415L14.474 21.21C14.474 22.1222 14.4996 23.1864 14.5965 23.6519C14.693 24.1179 14.8495 24.497 15.0432 24.7226C15.2366 24.9477 15.4604 25.1195 15.8293 25.1903C16.1727 25.2561 18.0529 25.4808 18.1507 24.8121C18.2678 24.0107 18.2722 23.1438 19.2596 19.9109C20.7966 14.8776 22.8006 12.4218 23.7427 11.5496C23.9074 11.3972 24.0955 11.3881 24.0865 11.6376C24.0463 12.7411 23.9048 15.4985 23.8096 17.8411C23.5544 24.1101 24.7798 25.2721 26.5309 25.2721C27.8707 25.2721 29.7592 24.0332 31.7836 20.8972C33.0457 18.9428 34.2711 17.0265 35.1516 15.6454C35.7651 16.174 36.4537 16.7429 37.1417 17.3507C38.7407 18.7631 39.2657 20.1052 38.9174 21.3784C38.651 22.3518 37.6477 23.3549 35.862 22.3799C35.3416 22.0955 35.1194 21.8757 34.5961 21.555C34.3149 21.3828 33.8857 21.3313 33.6283 21.5117C32.9597 21.9809 32.5774 22.5776 32.3591 23.3163C32.1467 24.0352 32.9202 24.4152 33.7221 24.7476C34.4125 25.0336 35.8965 25.2929 36.8429 25.3224C40.5304 25.4372 43.4844 23.6653 45.5407 19.095C45.9088 23.0421 47.4754 25.2756 50.1972 25.2756C52.0169 25.2756 53.8414 23.0865 54.6392 20.933C54.8682 21.8109 55.2073 22.5742 55.6451 23.2198C57.7424 26.3124 61.8111 25.6468 63.8548 23.0206C64.4867 22.2091 64.5829 21.9175 64.5829 21.9175C64.881 24.3973 67.0266 25.2637 68.2551 25.2637C69.631 25.2637 71.0517 24.6583 72.0474 22.5721C72.164 22.7985 72.2914 23.0147 72.4305 23.2197C74.5277 26.3123 78.5964 25.6467 80.6401 23.0205C80.7366 22.8974 80.8201 22.7856 80.8932 22.6853L80.9532 24.3141C80.9532 24.3141 79.7873 25.3095 79.0716 25.9202C75.9217 28.6098 73.5266 30.6503 73.3504 33.0266C73.1242 36.0565 75.7646 37.1826 77.7622 37.3302C79.8835 37.4869 81.7001 36.3963 82.8167 34.8699C83.7988 33.5265 84.4417 30.635 84.3945 27.7793C84.3757 26.6357 84.3448 25.1816 84.3205 23.623C85.4276 22.4265 86.6749 20.9141 87.8235 19.1439C89.0751 17.2147 90.4165 14.624 91.1033 12.6078C91.1033 12.6078 92.2688 12.6171 93.5125 12.5414C93.9104 12.5172 94.0247 12.5928 93.9511 12.8642C93.8623 13.1921 92.3797 18.5142 93.7328 22.0595C94.6589 24.4865 96.7467 25.2674 97.9845 25.2674C99.4335 25.2674 100.82 24.249 101.562 22.7367C101.652 22.9053 101.746 23.0684 101.848 23.219C103.945 26.3117 107.999 25.642 110.057 23.0199C110.522 22.4283 110.785 21.9168 110.785 21.9168C111.227 24.4832 113.372 25.276 114.6 25.276C115.879 25.276 117.094 24.7878 118.079 22.6183C118.12 23.5736 118.185 24.3547 118.287 24.6009C118.349 24.7515 118.713 24.9406 118.978 25.0319C120.148 25.4358 121.342 25.2448 121.783 25.1617C122.089 25.1041 122.328 24.8756 122.361 24.2858C122.446 22.7369 122.394 20.1346 122.898 18.2006C123.745 14.9548 124.535 13.6958 124.91 13.0725C125.119 12.7233 125.356 12.6657 125.365 13.0353C125.382 13.7831 125.422 15.9792 125.75 18.9299C125.991 21.0999 126.313 22.3826 126.561 22.7885C127.267 23.9494 128.138 24.0044 128.848 24.0044C129.3 24.0044 130.245 23.8882 130.16 23.1495C130.119 22.7894 130.191 20.564 131.026 17.3663C131.571 15.2781 132.48 13.3913 132.808 12.7016C132.929 12.4472 132.985 12.6477 132.983 12.6868C132.914 14.1248 132.759 18.8286 133.389 21.4012C134.242 24.8863 136.71 25.2763 137.571 25.2763C139.407 25.2763 140.909 23.9762 141.415 20.5554C141.537 19.7322 141.356 19.0966 140.816 19.0966"
									fill="url(#paint0_linear_387_385)"
								/>
								<defs>
									<linearGradient
										id="paint0_linear_387_385"
										x1="-4.16033"
										y1="33.437"
										x2="135.686"
										y2="17.2237"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#5B51D8" />
										<stop offset="0.45" stop-color="#C13584" />
										<stop offset="0.695" stop-color="#F77737" />
										<stop offset="0.9999" stop-color="#FFDC80" />
									</linearGradient>
								</defs>
							</svg>
							<Behance viewBox="0 0 152 29" />
							<Facebook viewBox="0 0 155 31" />
							<Patreon viewBox="0 0 142 29" />
							<Telegram viewBox="0 0 170 35" />
						</div>
					</div>

					<ContactForm />
				</div>
			</main>
		</>
	);
};

export default Page;
