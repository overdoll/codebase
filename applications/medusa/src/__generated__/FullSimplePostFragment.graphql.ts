/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostFragment = {
    readonly id: string;
    readonly club: {
        readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonClubFragment">;
    };
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryPublicSimpleFragment" | "PostMenuFragment" | "PostLikeButtonFragment" | "PostHeaderClubFragment" | "PostClickableCharactersFragment" | "PostClickableCategoriesFragment">;
    readonly " $refType": "FullSimplePostFragment";
};
export type FullSimplePostFragment$data = FullSimplePostFragment;
export type FullSimplePostFragment$key = {
    readonly " $data"?: FullSimplePostFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FullSimplePostFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "JoinClubButtonClubFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicSimpleFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostMenuFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCategoriesFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'd24b1e2a3778b9ad97a96486f180be3d';
export default node;
