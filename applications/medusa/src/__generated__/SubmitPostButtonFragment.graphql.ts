/**
 * @generated SignedSource<<7634ab55b3b040977d2791d3bc13a466>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmitPostButtonFragment$data = {
  readonly club: {
    readonly canCreateSupporterOnlyPosts: boolean;
  };
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
  }>;
  readonly id: string;
  readonly " $fragmentType": "SubmitPostButtonFragment";
};
export type SubmitPostButtonFragment$key = {
  readonly " $data"?: SubmitPostButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmitPostButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmitPostButtonFragment",
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
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        }
      ],
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "canCreateSupporterOnlyPosts",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "91c1edabab166b7e34f7228406e98d8f";

export default node;
