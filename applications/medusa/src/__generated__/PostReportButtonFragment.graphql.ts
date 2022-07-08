/**
 * @generated SignedSource<<d660ac5e6658242c0dafa10bcc46eb5c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReportButtonFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly id: string;
  readonly reference: string;
  readonly viewerReport: {
    readonly __typename: "PostReport";
  } | null;
  readonly " $fragmentType": "PostReportButtonFragment";
};
export type PostReportButtonFragment$key = {
  readonly " $data"?: PostReportButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostReportButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReportButtonFragment",
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
      "alias": null,
      "args": null,
      "concreteType": "PostReport",
      "kind": "LinkedField",
      "name": "viewerReport",
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "d07d8fb287f06621098b56269d6fbf36";

export default node;
