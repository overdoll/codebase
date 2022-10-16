/**
 * @generated SignedSource<<c0b27c78625c18e5d7100a49f439f125>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewPostFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly id: string;
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewContentFragment" | "PreviewFooterFragment" | "PreviewHeaderFragment">;
  readonly " $fragmentType": "PreviewPostFragment";
};
export type PreviewPostFragment$key = {
  readonly " $data"?: PreviewPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewPostFragment",
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
      "name": "PreviewHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewFooterFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "1f6064060c4547a3f1cf67ea4695e8d0";

export default node;
