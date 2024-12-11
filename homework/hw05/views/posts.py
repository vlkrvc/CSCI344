import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):

        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        print(ids_for_me_and_my_friends)
        print(request.args)
        try:
            count = int(request.args.get("limit", 20))
            if count > 50:
                return Response(
                    json.dumps({"message": "The limit is 50"}), 
                    mimetype="application/json", 
                    status=400,
                )
        
        except:
            return Response(
                    json.dumps({"message": "The limit must be an integer between 1 and 50"}), 
                    mimetype="application/json", 
                    status=400,
                )

        print("Limit:", limit)

        posts = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends)).limit(count)

        # TODO: add the ability to handle the "limit" query parameter:

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        

        data = request.json
        print(data)
        image_url = data.get("image_url")
        caption = data.get("caption")
        alt_text = data.get("alt_text")

        if not image_url:
            return Response(
                json.dumps({"message": "image_url is a required parameter"}), 
                mimetype="application/json", 
                status=400,
            )

        # 1. Create:
        new_post = Post(
            image_url='image_url',
            user_id=self.current_user.id,
            caption='caption',
            alt_text='alt_text'
        )

        db.session.add(new_post)    # issues the insert statement
        db.session.commit()         # commits the change to the database 





        return Response(
            json.dumps(new_post.to_dict(user=self.current_user)), 
            mimetype="application/json", 
            status=201
            )


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)
        
        data = request.json
        print(data)


        post = Post.query.get(id)
        
        if post is None:
            return Response(
                json.dumps({"Message": f"Post id=(id) not found"}),
                mimetype="application/json",
                status=404,
            )


        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"Message": f"you are not allowed to modify post id=(id)"}),
                mimetype="application/json",
                status=403,
            )

        data = request.json
        print(data)
        caption = data.get("caption")
        image_url = data.get("image_url")
        alt_text = data.get("alt_text")

        if caption is not None:
            post.caption = caption
        if image_url is not None:
            post.caption = image_url
        if alt_text is not None:
            post.caption = alt_text

        db.session.commit()  

        return Response(
                    json.dumps(post.to_dict(user=self.current_user)), 
                    mimetype="application/json", 
                    status=200,
                )

        return Response(json.dumps({}), mimetype="application/json", status=200)

    def delete(self, id):
        post = Post.query.get(id)
        
        if post is None:
            return Response(
                json.dumps({"Message": f"Post id=(id) not found"}),
                mimetype="application/json",
                status=404,
            )


        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"Message": f"you are not allowed to modify post id=(id)"}),
                mimetype="application/json",
                status=403,
            )

        Post.query.filter_by(id=10).delete()
        db.session.commit()

        return Response(
            json.dumps({"Message": f"Post id=(id) has been succesfully deleted"}),
            mimetype="application/json",
            status=200,
        )

    def get(self, id):
        is_authorized_and_exists = can_view_post(id, self.current_user)
        if is_authorized_and_exists:

            post = Post.query.get(id)
            return Response(
                json.dumps(post.to_dict(user=self.current_user)),
                mimetype="application/json",
                status=200,
        )
        
        else:
            return Response(
                json.dumps({"Message": f"Post id=(id) not found"}),
                mimetype="application/json",
                status=404,
        )

        
        

def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
