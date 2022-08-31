/**
 * @generated SignedSource<<4ebe6fc2c131c7f4a2711308e5ebbc60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ModerationPostActionsFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"ModerationRemovePostFormFragment">;
  readonly " $fragmentType": "ModerationPostActionsFragment";
};
export type ModerationPostActionsFragment$key = {
  readonly " $data"?: ModerationPostActionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ModerationPostActionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ModerationPostActionsFragment",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ModerationRemovePostFormFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "a507d633ba20f8faf746f7fc98e0dcd0";

export default node;
