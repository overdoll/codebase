/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostLikeButtonFragment = {
    readonly id: string;
    readonly viewerLiked: {
        readonly __typename: string;
    } | null;
    readonly likes: number;
    readonly " $refType": "PostLikeButtonFragment";
};
export type PostLikeButtonFragment$data = PostLikeButtonFragment;
export type PostLikeButtonFragment$key = {
    readonly " $data"?: PostLikeButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostLikeButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLikeButtonFragment",
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
      "concreteType": "PostLike",
      "kind": "LinkedField",
      "name": "viewerLiked",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "likes",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '078eda26610ea54daaa18bd3fc03fdac';
export default node;
