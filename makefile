deploy:
	rm -rf .next
	npm run build
	gcloud config set project ultra-heading-270300
	gcloud app deploy
browse:
	gcloud config set project ultra-heading-270300
	gcloud app browse
logs:
	gcloud config set project ultra-heading-270300
	gcloud app logs tail -s default