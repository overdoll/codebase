/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostFragment = {
    readonly reference: string;
    readonly club: {
        readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonClubFragment">;
    };
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryPublicDetailedFragment" | "PostMenuFragment" | "PostLikeButtonFragment" | "PostHeaderClubFragment" | "PostClickableCharactersFragment" | "PostClickableCategoriesFragment">;
    readonly " $refType": "FullDetailedPostFragment";
};
export type FullDetailedPostFragment$data = FullDetailedPostFragment;
export type FullDetailedPostFragment$key = {
    readonly " $data"?: FullDetailedPostFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FullDetailedPostFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
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
      "name": "PostGalleryPublicDetailedFragment"
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
(node as any).hash = '4dedbfc99b285fce0ddafc3fc165554e';
export default node;
