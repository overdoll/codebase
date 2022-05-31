/**
 * @generated SignedSource<<109ee65a94e384cb51c48438b6fb362e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArchivedPostFragment$data = {
  readonly reference: string;
  readonly club: {
    readonly slug: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostModerateButtonFragment" | "PostUnArchiveButtonFragment">;
  readonly " $fragmentType": "ArchivedPostFragment";
};
export type ArchivedPostFragment = ArchivedPostFragment$data;
export type ArchivedPostFragment$key = {
  readonly " $data"?: ArchivedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArchivedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArchivedPostFragment",
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
      "name": "PostPreviewContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostModerateButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostUnArchiveButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "03c3ee2ee3b3a762e1d223120c3900d3";

export default node;
