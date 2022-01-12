from commune.apps.core.renderers import CommuneJSONRenderer


class ProfileJSONRenderer(CommuneJSONRenderer):
    object_label = "profile"
    pagination_object_label = "profiles"
    pagination_count_label = "profilesCount"
