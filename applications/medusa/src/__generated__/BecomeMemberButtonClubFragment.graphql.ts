/**
 * @generated SignedSource<<0bed9f6b6db63adad5ad059acd61a1e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BecomeMemberButtonClubFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "BecomeMemberButtonClubFragment";
};
export type BecomeMemberButtonClubFragment = BecomeMemberButtonClubFragment$data;
export type BecomeMemberButtonClubFragment$key = {
  readonly " $data"?: BecomeMemberButtonClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BecomeMemberButtonClubFragment",
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "7ab9ba1610e832f17861de77b25694db";

export default node;
