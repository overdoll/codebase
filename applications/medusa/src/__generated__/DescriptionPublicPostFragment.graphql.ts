/**
 * @generated SignedSource<<2b6c25599b0c5763000f981e06a87378>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DescriptionPublicPostFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostFragment" | "MenuPublicPostFragment" | "RepostPublicPostFragment" | "SavePublicPostFragment" | "TagsPublicPostFragment">;
  readonly " $fragmentType": "DescriptionPublicPostFragment";
};
export type DescriptionPublicPostFragment$key = {
  readonly " $data"?: DescriptionPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DescriptionPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DescriptionPublicPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RepostPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavePublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TagsPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MenuPublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "65d863dc15578aabab324b88abb97677";

export default node;
