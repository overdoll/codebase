/**
 * @generated SignedSource<<98be2a3c77abe71f06ae9b6948f433dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubButtonClubFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly viewerMember: {
    readonly __typename: string;
  } | null;
  readonly " $fragmentType": "JoinClubButtonClubFragment";
};
export type JoinClubButtonClubFragment = JoinClubButtonClubFragment$data;
export type JoinClubButtonClubFragment$key = {
  readonly " $data"?: JoinClubButtonClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubButtonClubFragment",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
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
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "fdd4a6dac5b1a55090f79d507d1bb297";

export default node;
