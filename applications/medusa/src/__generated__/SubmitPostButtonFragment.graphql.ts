/**
 * @generated SignedSource<<ca4026f7128d8ab716a5f8692b7cf6b7>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PublishedPostFragment" | "ReviewPostFragment" | "isFailedFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublishedPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ReviewPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "isFailedFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "25d301bbeda51c6fe1d338ef47acff7e";

export default node;
