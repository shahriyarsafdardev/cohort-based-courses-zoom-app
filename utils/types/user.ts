export type ParticipantProfile = {
  first_name: string;
  last_name: string;
  linkedin_url: string;
  discord_url: string;
  profile_image_url: File | any;
  current_company: string;
  preferred_pronoun: string;
  current_position: string;
  strengths: string[] | any;
  current_role_category_selections: string[] | any;
  current_industry_category_selections: string[] | any;
  interests: string[] | any;
  bio_text: string;
  new_user: boolean;
  direct_message_notifications: string;
  everyone_tag_notifications: string;
  channel_summary_email: string;
  upcoming_session_email: string;
  accepted_terms: boolean;
  popup_viewed: boolean;
  new_instructor: boolean;
  opted_in_for_matching_suggestions: boolean;
  networking_matching_preferences: string[];
};

export type TimeStampType = {
  id: string;
  session_id: string;
  timestamp: string;
  description?: string;
}

export type ActiveSession = {
  id: string;
  session_time: string;
}