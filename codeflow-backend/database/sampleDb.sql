CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_premium BOOLEAN DEFAULT false,
    premium_start_date TIMESTAMP WITH TIME ZONE,
    premium_end_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE rankings (
    ranking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    ranking_points INT DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE challenges (
    challenge_id SERIAL PRIMARY KEY,
    challenge_name VARCHAR(255) NOT NULL,
    difficulty_level INT NOT NULL
);

CREATE TABLE user_challenges (
    user_challenge_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    challenge_id INT REFERENCES challenges(challenge_id),
    completion_status BOOLEAN DEFAULT false,
    completion_date TIMESTAMP WITH TIME ZONE,
    score INT
);

CREATE TABLE subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE,
    subscription_type VARCHAR(50)  -- Types could be "monthly", "annual", etc.
);
-- ---------------------------------------------------------------------
-- PROJECTS
{
  "_id": ObjectId(),
  "project_id": "UUID",
  "project_name": String,
  "created_by": "user_id",
  "creation_date": ISODate(),
  "last_updated": ISODate(),
  "language": String,
  "files": [
    {
      "file_name": String,
      "code_content": String,
      "last_modified": ISODate()
    }
  ],
  "collaborators": [
    {
      "user_id": "user_id",
      "permissions": ["read", "write", "admin"]
    }
  ],
  "is_public": Boolean
}
-- COLLABORATION SESSIONS

{
  "_id": ObjectId(),
  "session_id": "UUID",
  "project_id": "UUID",
  "participants": [
    {
      "user_id": "user_id",
      "join_time": ISODate(),
      "leave_time": ISODate()
    }
  ],
  "edits": [
    {
      "user_id": "user_id",
      "timestamp": ISODate(),
      "changes": String  // Could be a diff or patch representation
    }
  ],
  "session_start": ISODate(),
  "session_end": ISODate(),
  "active": Boolean
}

-- CODE REPOSITORIES

{
  "_id": ObjectId(),
  "repository_id": "UUID",
  "user_id": "user_id",
  "projects": ["project_id"],
  "creation_date": ISODate(),
  "repository_name": String
}
