/**
 * @generated SignedSource<<dd0459a5ec7b127d84902827bcddd4c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrepareCurationProfileFragment$data = {
  readonly curationProfile: {
    readonly audience: {
      readonly audiences: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
      }>;
    };
    readonly dateOfBirth: {
      readonly completed: boolean;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"CurationProfileFooterFragment">;
  readonly " $fragmentType": "PrepareCurationProfileFragment";
};
export type PrepareCurationProfileFragment$key = {
  readonly " $data"?: PrepareCurationProfileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrepareCurationProfileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrepareCurationProfileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CurationProfile",
      "kind": "LinkedField",
      "name": "curationProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AudienceCurationProfile",
          "kind": "LinkedField",
          "name": "audience",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Audience",
              "kind": "LinkedField",
              "name": "audiences",
              "plural": true,
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
                  "name": "title",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DateOfBirthCurationProfile",
          "kind": "LinkedField",
          "name": "dateOfBirth",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "completed",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CurationProfileFooterFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "63b44593b0a7c4a3cf5d2548e298c943";

export default node;
