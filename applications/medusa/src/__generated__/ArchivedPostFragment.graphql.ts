/**
 * @generated SignedSource<<ef15707421d98bdcb36e54f96bf3445a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArchivedPostFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostAnalyticsButtonFragment" | "PostEditButtonFragment" | "PostModerateButtonFragment" | "PostPreviewContentFragment" | "PostUnArchiveButtonFragment" | "PostViewButtonFragment">;
  readonly " $fragmentType": "ArchivedPostFragment";
};
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostViewButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostAnalyticsButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostEditButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "5038954da1ca9f9436935a6158fe34b2";

export default node;
