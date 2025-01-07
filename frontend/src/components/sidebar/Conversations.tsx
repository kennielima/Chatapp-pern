import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import { DUMMY_CONVERSATIONS } from "../../dummy/dummy";

const Conversations = () => {
	const { loading, conversations } = useGetConversations()

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.length === 0 ?
				(
					conversations.map((conversation) => (
						<Conversation
							key={conversation.id}
							conversation={conversation}
							emoji={getRandomEmoji()}
						/>
					))
				) : (
					DUMMY_CONVERSATIONS.map((conversation) => (
						<Conversation
							key={conversation.id}
							emoji={getRandomEmoji()}
							conversation={{
								id:  `${conversation.id}`,
								fullName:  `${conversation.fullName}`,
								profilePic: `${conversation.profilePic}`
							}}
						/>
					))
				)
			}
			{loading ? (
				<span className="loading loading-spinner mx-auto" />
			) : null}
		</div>
	);
};
export default Conversations;
